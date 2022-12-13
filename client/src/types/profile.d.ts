export interface ProfileType {
  username: string;
  code: string;
  language: string;
  interest: string;
  techStack: string[];
  worktype: string;
  worktime: string;
  email: string;
  requirements: string[];
  liked?: boolean;
}

export interface SingleProfileType {
  id: string;
  language: string;
  code: string;
  interest: string;
  techStack: Array<string>;
  requirements: Array<string>;
  liked: boolean;
}
