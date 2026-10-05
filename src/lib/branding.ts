export const normalizeBrandingName = (value: string = ""): string => {
  const normalized = value
    .trim()
    .toLowerCase()
    .replace(/²/g, "2")
    .replace(/\s+/g, " ");

  if (
    normalized === "v2 oil" ||
    normalized === "v2 coconut oil" ||
    normalized === "naturas virgin oil" ||
    normalized === "natural virgin oil"
  ) {
    return "V2 Oil";
  }

  if (
    normalized === "evergreen premium coir" ||
    normalized === "ever green coir" ||
    normalized === "evergreen coir"
  ) {
    return "V2 Products";
  }

  return value;
};
