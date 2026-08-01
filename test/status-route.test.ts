import assert from "node:assert/strict";
import { afterEach, beforeEach, test } from "node:test";
import { GET } from "../src/app/api/status/route";
import { normalizeProviderResponse } from "../src/services/statusProviderContract";
import { resetStatusCacheForTests } from "../src/services/statusRouteCache";

const originalFetch = globalThis.fetch;

function providerResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

async function readRouteResponse(): Promise<{
  status: number;
  body: unknown;
}> {
  const response = await GET();
  return { status: response.status, body: await response.json() };
}

beforeEach(() => {
  resetStatusCacheForTests();
});

afterEach(() => {
  globalThis.fetch = originalFetch;
  resetStatusCacheForTests();
});

test("online provider response returns HTTP 200 with sanitized server data", async () => {
  globalThis.fetch = async () =>
    providerResponse({
      online: true,
      players: { online: 4.9, max: 20.8 },
      version: "1.21.8",
      hostname: "play.example.test",
    });

  const result = await readRouteResponse();

  assert.equal(result.status, 200);
  assert.deepEqual(result.body, {
    ok: true,
    server: {
      online: true,
      playersOnline: 4,
      playersMax: 20,
      version: "1.21.8",
      address: "play.example.test",
    },
  });
});

test("offline provider response returns HTTP 200", async () => {
  globalThis.fetch = async () =>
    providerResponse({ online: false, players: { online: 0, max: 0 } });

  const result = await readRouteResponse();

  assert.equal(result.status, 200);
  assert.deepEqual(result.body, {
    ok: true,
    server: {
      online: false,
      playersOnline: 0,
      playersMax: null,
      version: "1.21+",
      address: "play.paraguaycraft.com",
    },
  });
});

test("provider HTTP failure returns HTTP 502", async () => {
  globalThis.fetch = async () => providerResponse({}, 503);

  const result = await readRouteResponse();

  assert.equal(result.status, 502);
  assert.deepEqual(result.body, {
    ok: false,
    error: "provider_unavailable",
  });
});

test("cached provider failure keeps HTTP 502 and does not refetch", async () => {
  let fetchCount = 0;
  globalThis.fetch = async () => {
    fetchCount += 1;
    return providerResponse({}, 503);
  };

  const first = await readRouteResponse();
  const second = await readRouteResponse();

  assert.equal(first.status, 502);
  assert.equal(second.status, 502);
  assert.deepEqual(second.body, {
    ok: false,
    error: "provider_unavailable",
  });
  assert.equal(fetchCount, 1);
});

test("malformed provider response returns HTTP 502", async () => {
  globalThis.fetch = async () => providerResponse({ online: "true" });

  const result = await readRouteResponse();

  assert.equal(result.status, 502);
  assert.deepEqual(result.body, {
    ok: false,
    error: "invalid_provider_response",
  });
});

test("unknown and zero player maximums become null", async () => {
  globalThis.fetch = async () => providerResponse({ online: true, players: {} });
  const unknownMax = await readRouteResponse();

  assert.equal(unknownMax.status, 200);
  assert.equal(
    (unknownMax.body as { server: { playersMax: number | null } }).server
      .playersMax,
    null,
  );

  resetStatusCacheForTests();
  globalThis.fetch = async () =>
    providerResponse({ online: true, players: { online: 1, max: 0 } });
  const zeroMax = await readRouteResponse();

  assert.equal(zeroMax.status, 200);
  assert.equal(
    (zeroMax.body as { server: { playersMax: number | null } }).server
      .playersMax,
    null,
  );
});

test("negative and non-finite player values are rejected", () => {
  for (const value of [-1, Number.NaN, Number.POSITIVE_INFINITY]) {
    assert.deepEqual(
      normalizeProviderResponse(
        { online: true, players: { online: value } },
        "1.21+",
        "play.example.test",
      ),
      { ok: false, error: "invalid_provider_response" },
    );
  }
});

test("optional provider fields must remain scalar strings", () => {
  assert.deepEqual(
    normalizeProviderResponse(
      { online: true, version: { value: "1.21.8" } },
      "1.21+",
      "play.example.test",
    ),
    { ok: false, error: "invalid_provider_response" },
  );
  assert.deepEqual(
    normalizeProviderResponse(
      { online: true, hostname: ["play.example.test"] },
      "1.21+",
      "play.example.test",
    ),
    { ok: false, error: "invalid_provider_response" },
  );
});
