import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { is_authenticated } from './AuthService';
import config from '../../http/config';
import { useNavigation } from '@react-navigation/native';

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [user, setUser] = useState(null); // Store user info here
  const navigation = useNavigation();

  const logout = async () => {
    setIsAuthenticated(false);
    try {
      await AsyncStorage.removeItem("erp_token");
      config.workspace.erp.token = undefined
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }

  };

  const navigate = async (...args) => {
    const success = await is_authenticated()
    if (!success) {
      setIsAuthenticated(false);
      return navigation.navigate("Login");
    }
    return navigation.navigate(...args);
  };

  useEffect(() => {
    const loadAuthState = async () => {
      const success = await is_authenticated()
      setIsAuthenticated(success);
    };

    loadAuthState();
    const refreshInterval = setInterval(() => loadAuthState(), 5000);

    return () => clearInterval(refreshInterval);
  }, []);



  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, user, logout, setUser , navigate}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
