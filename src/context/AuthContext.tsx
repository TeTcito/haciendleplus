import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  getAdminAccount,
  saveAdminAccount,
  verifyAdminCredentials,
} from '../config/adminAccount';

export interface AdminProfile {
  id: string;
  first_name: string;
  last_name: string;
  phone: string;
  bio: string;
  avatar_url: string | null;
}

interface SimpleUser {
  id: string;
  email: string;
}

interface AuthContextType {
  user: SimpleUser | null;
  profile: AdminProfile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<boolean>;
  updateProfile: (data: {
    firstName?: string;
    lastName?: string;
    phone?: string;
    bio?: string;
    email?: string;
    password?: string;
  }) => Promise<void>;
  refreshProfile: () => Promise<void>;
  signOut: () => Promise<void>;
}

const SESSION_STORAGE_KEY = 'leplus_admin_authenticated_session_v1';

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  loading: true,
  signIn: async () => false,
  updateProfile: async () => {},
  refreshProfile: async () => {},
  signOut: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<SimpleUser | null>(null);
  const [profile, setProfile] = useState<AdminProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const loadCurrentAccount = () => {
    const account = getAdminAccount();
    const isSessionActive = localStorage.getItem(SESSION_STORAGE_KEY) === 'true';

    if (isSessionActive) {
      setUser({
        id: 'admin-leplus-master',
        email: account.email,
      });
      setProfile({
        id: 'admin-leplus-master',
        first_name: account.firstName,
        last_name: account.lastName,
        phone: account.phone,
        bio: account.bio,
        avatar_url: null,
      });
    } else {
      setUser(null);
      setProfile(null);
    }
  };

  useEffect(() => {
    loadCurrentAccount();
    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string): Promise<boolean> => {
    const isValid = verifyAdminCredentials(email, password);
    if (!isValid) {
      throw new Error('Credenciales incorrectas. Verifique su usuario/correo y contraseña.');
    }

    localStorage.setItem(SESSION_STORAGE_KEY, 'true');
    loadCurrentAccount();
    return true;
  };

  const updateProfile = async (data: {
    firstName?: string;
    lastName?: string;
    phone?: string;
    bio?: string;
    email?: string;
    password?: string;
  }) => {
    saveAdminAccount({
      ...(data.firstName !== undefined && { firstName: data.firstName }),
      ...(data.lastName !== undefined && { lastName: data.lastName }),
      ...(data.phone !== undefined && { phone: data.phone }),
      ...(data.bio !== undefined && { bio: data.bio }),
      ...(data.email !== undefined && { email: data.email }),
      ...(data.password !== undefined && { password: data.password }),
    });
    loadCurrentAccount();
  };

  const refreshProfile = async () => {
    loadCurrentAccount();
  };

  const signOut = async () => {
    localStorage.removeItem(SESSION_STORAGE_KEY);
    setUser(null);
    setProfile(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        signIn,
        updateProfile,
        refreshProfile,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
