import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthState } from '../types/auth';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => boolean;
  logout: () => void;
  register: (name: string, email: string, password: string, role: 'user' | 'admin') => boolean;
  updateUser: (user: User) => void;
  users: Array<User & { password: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
  });

  const [users, setUsers] = useState<Array<User & { password: string }>>([]);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedUsers = localStorage.getItem('users');
    
    if (storedUser) {
      setAuthState({
        user: JSON.parse(storedUser),
        isAuthenticated: true,
      });
    }
    
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }
  }, []);

  const register = (name: string, email: string, password: string, role: 'user' | 'admin'): boolean => {
    // Check if user already exists
    if (users.some(user => user.email === email)) {
      return false;
    }

    const newUser = {
      id: Date.now().toString(),
      email,
      name,
      password,
      role,
      permissions: role === 'admin' ? ['read', 'write', 'delete'] : ['read'],
    };

    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    const { password: _, ...userWithoutPassword } = newUser;
    setAuthState({ user: userWithoutPassword, isAuthenticated: true });
    localStorage.setItem('user', JSON.stringify(userWithoutPassword));

    return true;
  };

  const login = (email: string, password: string): boolean => {
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
      return false;
    }

    const { password: _, ...userWithoutPassword } = user;
    setAuthState({ user: userWithoutPassword, isAuthenticated: true });
    localStorage.setItem('user', JSON.stringify(userWithoutPassword));
    
    return true;
  };

  const logout = () => {
    localStorage.removeItem('user');
    setAuthState({ user: null, isAuthenticated: false });
  };

  const updateUser = (updatedUser: User) => {
    setAuthState({ user: updatedUser, isAuthenticated: true });
    localStorage.setItem('user', JSON.stringify(updatedUser));
    
    // Update user in users array
    const updatedUsers = users.map(user => 
      user.id === updatedUser.id ? { ...user, ...updatedUser } : user
    );
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout, register, updateUser, users }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};