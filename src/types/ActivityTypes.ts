
export interface ActivityRecord {
  id: string;
  category: string;
  action: string;
  timestamp?: Date;
}

export type ActivityCategory = 'ACCOUNT' | 'OB' | 'IB' | "TEAM'S DEV" | '';
export type ActivityAction = 'EMAIL' | 'PROCESS' | 'MEETING' | 'ENDO' | 'SMS' | 'WC' | '';

export interface CategoryCount {
  category: string;
  count: number;
}

export interface ActionCount {
  action: string;
  count: number;
}

export interface CategoryActionCount {
  category: string;
  action: string;
  count: number;
}
