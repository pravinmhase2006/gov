export interface ExamCardData {
  id: string;
  name: string;
  slug: string;
  organization: {
    name: string;
    shortName: string;
  };
  category: string;
  frequency: string;
  upcomingDate?: string | null;
  description?: string | null;
  isPopular?: boolean;
}

export interface SyllabusItem {
  subject: string;
  topics: string[];
}
