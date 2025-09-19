import { useState, useEffect } from 'react';
import { User } from '../types';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
  const storedUser = localStorage.getItem('medi-mantra_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (phone: string, aadhaar?: string, role: 'patient' | 'doctor' = 'patient') => {
    // Mock login - in real app, this would call your auth API
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: role === 'doctor' ? 'Dr. ' + phone.slice(-4) : 'Patient ' + phone.slice(-4),
      phone,
      role,
      aadhaar,
      specialization: role === 'doctor' ? 'General Medicine' : undefined,
      createdAt: new Date().toISOString(),
    };

  localStorage.setItem('medi-mantra_user', JSON.stringify(newUser));
    setUser(newUser);
    return newUser;
  };

  const logout = () => {
  localStorage.removeItem('medi-mantra_user');
    setUser(null);
  };

  return { user, loading, login, logout };
};