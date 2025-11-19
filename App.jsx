import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthScreen from "./src/screens/AuthScreen";
import HomeScreen from "./src/screens/HomeScreen";

export default function App() {
  const [token, setToken] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const loadToken = async () => {
      const t = await AsyncStorage.getItem("token");
      if (t) setToken(t);
      setChecking(false);
    };
    loadToken();
  }, []);

  const handleAuth = (newToken) => {
    setToken(newToken);
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    setToken(null);
  };

  if (checking) return null;

  return token ? (
    <HomeScreen token={token} onLogout={handleLogout} />
  ) : (
    <AuthScreen onAuth={handleAuth} />
  );
}
