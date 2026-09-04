export interface UserDTO {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface CreateJobDTO {
  title: string;
  slug: string;
  organizationId: string;
  postName: string;
  totalVacancies: number;
  qualification: string;
  ageLimitMin: number;
  ageLimitMax: number;
  salaryText?: string;
  startDate: string;
  lastDate: string;
}
