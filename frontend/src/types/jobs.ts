export interface JobCardData {
  id: string;
  title: string;
  slug: string;
  department?: string | null;
  organization: {
    id: string;
    name: string;
    shortName: string;
    logoUrl?: string | null;
  };
  category?: {
    id: string;
    name: string;
    slug: string;
  } | null;
  qualification: string;
  vacancies: number;
  vacanciesDisplay?: string | null;
  location: string;
  salary: string;
  applicationStart: Date | string;
  applicationEnd?: Date | string | null;
  examDate?: string | null;
  isFeatured: boolean;
  isUrgent: boolean;
  isNew?: boolean;
  views?: number;
  clicks?: number;
  createdAt: Date | string;
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
