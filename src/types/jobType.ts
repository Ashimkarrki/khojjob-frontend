export interface jobType {
  jid: number;
  tags: [string];
  title: string;
  location: string;
  experience: string;
  level: string;
  types: string;
  salary: string;
  last_date: string;
}

export interface propJobType extends jobType {
  company: {
    name: string;
  };
}
