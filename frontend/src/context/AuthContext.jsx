import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialUsers } from '../data/mockData';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Default to approved Farmer for rich immediate demonstration, or persist in localStorage
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('agriconnect_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return initialUsers[0]; // Default Farmer: Ramesh Patel
      }
    }
    return initialUsers[0];
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('agriconnect_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('agriconnect_user');
    }
  }, [user]);

  const login = (role, email, password) => {
    const matched = initialUsers.find(
      u => u.role === role && (!email || u.email.toLowerCase() === email.toLowerCase())
    );
    if (matched) {
      setUser(matched);
      return { success: true, user: matched };
    }
    // Fallback demo user generator if custom email typed
    const newUser = {
      id: Date.now(),
      name: email.split('@')[0],
      email: email,
      role: role,
      phone: "+91 98000 00000",
      city: "Demo City",
      state: "State",
      verificationStatus: role === 'FARMER' ? 'PENDING' : 'APPROVED'
    };
    setUser(newUser);
    return { success: true, user: newUser };
  };

  const register = (registrationData) => {
    const newUser = {
      id: Date.now(),
      ...registrationData,
      verificationStatus: registrationData.role === 'FARMER' ? 'PENDING' : 'APPROVED'
    };
    setUser(newUser);
    return { success: true, user: newUser };
  };

  const logout = () => {
    setUser(null);
  };

  // Quick switch for reviewers/stakeholders to test Farmer vs Customer vs Admin in 1-click
  const switchRole = (role) => {
    const targetUser = initialUsers.find(u => u.role === role) || {
      id: Date.now(),
      name: `Demo ${role}`,
      email: `${role.toLowerCase()}@agriconnect.com`,
      role: role
    };
    setUser(targetUser);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        role: user?.role || null,
        login,
        register,
        logout,
        switchRole,
        setUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

