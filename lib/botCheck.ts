export function looksLikeBot(body: { hp?: string; startedAt?: string | number }): boolean {
  if (body.hp) return true;

  const startedAt = Number(body.startedAt);
  if (!startedAt || Number.isNaN(startedAt)) return true;

  const elapsed = Date.now() - startedAt;
  return elapsed < 1500;
}
