// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function isString(s: any): s is string {
  return typeof s === "string";
}

export function getStringParam(s: string | string[] | undefined): string {
  if (!s) return "";
  if (typeof s === "string") return s;
  return s[0] || "";
}
