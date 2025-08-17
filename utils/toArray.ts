export function toArray<T=string>(value: unknown): T[] {
  if (Array.isArray(value)) return value as T[];
  if (value == null) return [];
  if (typeof value === 'object') {
    const v = value as Record<string, unknown>;
    const keys = Object.keys(v).sort((a,b)=> Number(a)-Number(b));
    return keys.every(k=> /^\d+$/.test(k)) ? keys.map(k=> v[k] as T) : [];
  }
  return [];
}
