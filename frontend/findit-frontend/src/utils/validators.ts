export function isSetuEmail(email: string) {
  const trimmed = email.trim().toLowerCase();
  return trimmed.endsWith("@setu.ie");
}

export function isBasicEmailFormat(email: string) {
  const trimmed = email.trim();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
}
