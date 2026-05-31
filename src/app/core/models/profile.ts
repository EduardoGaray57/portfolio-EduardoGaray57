export interface Profile {
  fullName: string;
  title: string;
  tagline: string;
  bio: string;
  graduationNote: number;
  graduatedWithDistinction: boolean;
  university: string;
  contacts: {
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    github: string;
  };
}
