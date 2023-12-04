export function isPresent<TItem>(item: TItem | undefined | null): item is TItem {
  return !!item;
}

export const sum = (total: number, value: number) => total + value;
