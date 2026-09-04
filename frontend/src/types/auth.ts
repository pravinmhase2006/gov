export interface UserSession {
  id: string;
  email: string;
  name: string;
  role: 'CANDIDATE' | 'ADMIN' | 'CONTRIBUTOR';
}

export interface UserProfile {
  id: string;
  userId: string;
  phone?: string | null;
  qualification?: string | null;
  state?: string | null;
  category?: string | null;
  targetExams?: string | null;
}
