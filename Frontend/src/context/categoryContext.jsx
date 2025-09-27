import React, { useState, useEffect, useContext, createContext } from "react";
import { useAuth } from "./AuthContext";
import axiosInstance from "../Services/axios";
import { getCategories } from "../Services/categoryService";

const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const [category, setCategory] = useState([]);

  console.log("Auth State (CategoryContext): ", isAuthenticated);

  useEffect(() => {
    if (loading) return;
    if (!isAuthenticated) return;
    const fetchCategory = async () => {
      const response = await getCategories();
      setCategory(response);
      console.log("Response Category", response);
      return response;
    };
    fetchCategory();
  }, [isAuthenticated, loading]);

  return (
    <CategoryContext.Provider value={{ category }}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () => useContext(CategoryContext);
