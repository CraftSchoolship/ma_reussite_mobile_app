import React, { createContext, useState, useContext, useEffect } from 'react';
import { is_authenticated } from './AuthService';
import { useNavigation } from '@react-navigation/native';

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const navigation = useNavigation();

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
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, navigate}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default AuthProvider;