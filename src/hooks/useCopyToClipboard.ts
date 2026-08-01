"use client";

import { useState, useRef, useCallback, useEffect } from "react";

export type CopyState = "idle" | "copying" | "copied" | "failed";

interface UseCopyToClipboardOptions {
  resetAfter?: number;
  onSuccess?: () => void;
  onError?: () => void;
}

export function useCopyToClipboard(options: UseCopyToClipboardOptions = {}) {
  const { resetAfter = 2000, onSuccess, onError } = options;
  const [state, setState] = useState<CopyState>("idle");
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const copy = useCallback(
    async (text: string) => {
      setState("copying");

      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(text);
        } else {
          // Fallback for older browsers or non-HTTPS contexts
          const textarea = document.createElement("textarea");
          textarea.value = text;
          textarea.style.position = "fixed";
          textarea.style.left = "-9999px";
          textarea.style.top = "-9999px";
          document.body.appendChild(textarea);
          textarea.focus();
          textarea.select();
          const success = document.execCommand("copy");
          document.body.removeChild(textarea);
          if (!success) throw new Error("execCommand copy failed");
        }

        setState("copied");
        onSuccess?.();
        timerRef.current = setTimeout(() => setState("idle"), resetAfter);
      } catch {
        setState("failed");
        onError?.();
        timerRef.current = setTimeout(() => setState("idle"), resetAfter * 2);
      }
    },
    [resetAfter, onSuccess, onError],
  );

  return { state, copy };
}
