export const normalizeBrandingName = (value: string = ""): string => {
  const normalized = value.trim().toLowerCase();

  if (
    normalized === "v² oil" ||
    normalized === "v2 oil" ||
    normalized === "v² coconut oil" ||
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
