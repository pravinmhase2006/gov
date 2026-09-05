export interface ExamCardData {
  id?: string;
  name: string;
  slug: string;
  organization?: string | {
    name?: string;
    shortName?: string;
  };
  category?: string | {
    name?: string;
  };
  frequency?: string;
  upcomingDate?: string | null;
  description?: string | null;
  isPopular?: boolean;
  totalApplicants?: string;
}

export interface SyllabusItem {
  subject: string;
  topics: string[];
}

