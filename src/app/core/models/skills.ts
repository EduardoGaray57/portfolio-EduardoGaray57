export interface SkillCategory {
  id: string;
  label: string;
  colorClass: string;
  skills: string[];
}

export interface SkillsData {
  categories: SkillCategory[];
}
