export type SearchFieldBuilder = (
  word: string
) => Record<string, any>;

export const buildWordSearch = (
  search?: string,
  fields: SearchFieldBuilder[] = []
) => {

  if (!search?.trim()) {
    return undefined;
  }

  const words = search
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  return words.map((word) => ({

    OR: fields.map((field) => field(word)),

  }));

};