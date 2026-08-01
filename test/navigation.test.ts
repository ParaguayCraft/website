import assert from "node:assert/strict";
import test from "node:test";
import { isActiveNavigationPath } from "../src/components/header/navigation";

test("active navigation matching respects route boundaries", () => {
  assert.equal(isActiveNavigationPath("/mapa", "/mapa"), true);
  assert.equal(isActiveNavigationPath("/mapa/extra", "/mapa"), true);
  assert.equal(isActiveNavigationPath("/mapa-extra", "/mapa"), false);
  assert.equal(isActiveNavigationPath("/noticias", "/"), false);
});
