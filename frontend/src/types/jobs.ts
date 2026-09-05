export interface JobCardData {
  id: string;
  title: string;
  slug: string;
  department?: string | null;
  organization: {
    id?: string;
    name: string;
    shortName?: string;
    logoUrl?: string | null;
  } | string;
  organizationCode?: string;
  category?: {
    id?: string;
    name: string;
    slug?: string;
  } | string | null;
  qualification?: string;
  vacancies?: number;
  totalVacancies?: number;
  vacanciesDisplay?: string | null;
  location?: string;
  state?: string | null;
  salary?: string;
  salaryText?: string | null;
  applicationStart?: Date | string;
  applicationEnd?: Date | string | null;
  lastDate?: string | null;
  examDate?: string | null;
  isFeatured?: boolean;
  isUrgent?: boolean;
  isTrending?: boolean;
  isNew?: boolean;
  views?: number;
  clicks?: number;
  createdAt?: Date | string;
}

export interface JobFilterParams {
  q?: string;
  qualification?: string;
  category?: string;
  state?: string;
  sort?: 'latest' | 'urgent' | 'popular' | 'vacancies';
  page?: number;
  limit?: number;
}
