import type { ParsedQs } from "qs";
import type { Trade } from "../types/trade.js";

export function filter(trades: Trade[], query: ParsedQs): Trade[] {
  const { id, atleast, atmost, above, below, since, prior } = query;

  let filtered = trades;

  // Filtra por ID específico (se fornecido)
  if (id) {
    return filtered.filter((t) => t.t === Number(id));
  }

  // Filtra por quantidade mínima (se fornecida)
  if (atleast) {
    filtered = filtered.filter((t) => Number(t.q) >= Number(atleast));
  }

  // Filtra por quantidade máxima (se fornecida)
  if (atmost) {
    filtered = filtered.filter((t) => Number(t.q) <= Number(atmost));
  }

  // Filtra por preço mínimo (se fornecido)
  if (above) {
    filtered = filtered.filter((t) => Number(t.p) >= Number(above));
  }

  // Filtra por preço máximo (se fornecido)
  if (below) {
    filtered = filtered.filter((t) => Number(t.p) <= Number(below));
  }

  // Filtra por tempo inicial (se fornecido)
  if (since) {
    filtered = filtered.filter((t) => t.T >= Number(since));
  }

  // Filtra por tempo final (se fornecido)
  if (prior) {
    filtered = filtered.filter((t) => t.T <= Number(prior));
  }

  return filtered;
}
