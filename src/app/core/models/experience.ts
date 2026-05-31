export interface ExperienceEntry {
  id: string;
  type: 'work' | 'education';
  /** Used by work entries */
  role?: string;
  organization?: string;
  /** Used by education entries */
  degree?: string;
  institution?: string;
  startDate: string | null;
  endDate: string | null;
  description: string[];
  highlights?: string[];
}

export interface ExperienceData {
  work: ExperienceEntry[];
  education: ExperienceEntry[];
}
