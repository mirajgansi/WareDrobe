// types.ts
export interface Dress {
    id: number;
    name: string;
    date: string;
    comment?: string;
    category?: string;
    season?: string;
    brand?: string;
    occasion?: string;
    last_worn_date?: string;
    times_worn?: number;
    favorite?: boolean;
    dressimage: string;
  }
  