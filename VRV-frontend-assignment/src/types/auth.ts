export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
  permissions: string[];
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  userId: string;
}