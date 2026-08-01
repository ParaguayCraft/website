import type { CopyState } from "@/hooks/useCopyToClipboard";

export function isExternalNavigationLink(href: string): boolean {
  return href.startsWith("http://") || href.startsWith("https://");
}

export function isActiveNavigationPath(pathname: string, href: string): boolean {
  if (isExternalNavigationLink(href)) return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function getCopyButtonLabel(state: CopyState): string {
  switch (state) {
    case "copying":
      return "COPIANDO...";
    case "copied":
      return "IP COPIADA";
    case "failed":
      return "NO SE PUDO COPIAR";
    default:
      return "ENTRAR";
  }
}

export function getCopyStatusMessage(state: CopyState, address: string): string {
  switch (state) {
    case "copying":
      return `Copiando la dirección IP: ${address}`;
    case "copied":
      return `Dirección IP copiada: ${address}`;
    case "failed":
      return `No se pudo copiar la dirección IP: ${address}`;
    default:
      return "";
  }
}
