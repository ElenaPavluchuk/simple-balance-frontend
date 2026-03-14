import { useState, useEffect, useMemo } from "react";
import { UserContext } from "../../../shared/context/user/UserContext";
import axiosInstance from "../../../shared/utils/axiosInstance";
import { API_PATHS } from "../../../shared/utils/apiPaths";

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const { data } = await axiosInstance.get(API_PATHS.USERS.USER_PROFILE);
        setUser(data);
      } catch (err) {
        console.error("Cannot load user", err);
        localStorage.removeItem("token");
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  const updateUser = (userData) => setUser(userData);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      isLoading,
      updateUser,
      logout,
    }),
    [user, isLoading],
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;
