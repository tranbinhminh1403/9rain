export type Character = {
  name: string;
  abilities: { name: string; description: string, note?: string }[];
  stat_array: string[];
  scaling: string[];
  img: string;
  stat: number[][];
  basic_stat_array: string[];
  basic_stat: number[][];
};

