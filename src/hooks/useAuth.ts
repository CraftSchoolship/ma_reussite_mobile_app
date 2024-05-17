// src/hooks/useAuth.ts

import { useState, useEffect } from "react";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // Fetch authentication status from storage or an API
    const fetchAuthStatus = async () => {
      // Example: Fetch token from AsyncStorage and verify it
      // const token = await AsyncStorage.getItem('authToken');
      // setIsAuthenticated(!!token);

      // For demo purposes, we'll just set it to true
      setIsAuthenticated(false);
    };

    fetchAuthStatus();
  }, []);

  return { isAuthenticated };
};
