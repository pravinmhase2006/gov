/**
 * REST API client helper for React SPA
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = localStorage.getItem('govtprep_token');

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }

  return response.json();
}

export const authService = {
  getToken: () => localStorage.getItem('govtprep_token'),
  getUser: () => {
    try {
      const user = localStorage.getItem('govtprep_user');
      return user ? JSON.parse(user) : null;
    } catch {
      return null;
    }
  },
  setUser: (user: any, token?: string) => {
    localStorage.setItem('govtprep_user', JSON.stringify(user));
    if (token) localStorage.setItem('govtprep_token', token);
  },
  logout: () => {
    localStorage.removeItem('govtprep_user');
    localStorage.removeItem('govtprep_token');
  },
  isAuthenticated: () => !!localStorage.getItem('govtprep_token'),
};

export const authApi = {
  async login(credentials: { email: string; password: string }) {
    return apiRequest<{ token: string; user: any }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  async register(data: { name: string; email: string; password: string; targetExam?: string }) {
    return apiRequest<{ token: string; user: any }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async getMe() {
    return apiRequest<{ user: any }>('/auth/me');
  },

  async logout() {
    try {
      await apiRequest('/auth/logout', { method: 'POST' });
    } catch {
      // Ignore network errors on logout
    }
    authService.logout();
  },
};

export const adminApi = {
  async getAnalytics() {
    return apiRequest<any>('/admin/analytics');
  },

  // Users CRUD
  async getUsers(search?: string) {
    const query = search ? `?search=${encodeURIComponent(search)}` : '';
    return apiRequest<any[]>(`/admin/users${query}`);
  },

  async updateUserRole(id: string, role: 'USER' | 'ADMIN') {
    return apiRequest<any>(`/admin/users/${id}/role`, {
      method: 'PUT',
      body: JSON.stringify({ role }),
    });
  },

  async deleteUser(id: string) {
    return apiRequest<any>(`/admin/users/${id}`, {
      method: 'DELETE',
    });
  },

  // Jobs CRUD
  async getJobs() {
    return apiRequest<any[]>('/admin/jobs');
  },

  async createJob(jobData: any) {
    return apiRequest<any>('/admin/jobs', {
      method: 'POST',
      body: JSON.stringify(jobData),
    });
  },

  async updateJob(id: string, jobData: any) {
    return apiRequest<any>(`/admin/jobs/${id}`, {
      method: 'PUT',
      body: JSON.stringify(jobData),
    });
  },

  async deleteJob(id: string) {
    return apiRequest<any>(`/admin/jobs/${id}`, {
      method: 'DELETE',
    });
  },

  // Exams CRUD
  async getExams() {
    return apiRequest<any[]>('/admin/exams');
  },

  async createExam(examData: any) {
    return apiRequest<any>('/admin/exams', {
      method: 'POST',
      body: JSON.stringify(examData),
    });
  },

  async updateExam(id: string, examData: any) {
    return apiRequest<any>(`/admin/exams/${id}`, {
      method: 'PUT',
      body: JSON.stringify(examData),
    });
  },

  async deleteExam(id: string) {
    return apiRequest<any>(`/admin/exams/${id}`, {
      method: 'DELETE',
    });
  },

  // Mock Tests CRUD
  async getTests() {
    return apiRequest<any[]>('/admin/tests');
  },

  async createTest(testData: any) {
    return apiRequest<any>('/admin/tests', {
      method: 'POST',
      body: JSON.stringify(testData),
    });
  },

  async deleteTest(id: string) {
    return apiRequest<any>(`/admin/tests/${id}`, {
      method: 'DELETE',
    });
  },
};

