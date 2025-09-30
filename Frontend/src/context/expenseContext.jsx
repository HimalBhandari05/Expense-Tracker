import React, { useState, useEffect, createContext, useContext } from "react";
import axiosInstance from "../Services/axios";
import { getExpense, getExpenses } from "../Services/expenseService";
import { useAuth } from "./AuthContext";

const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const [expenses, setExpenses] = useState([]);
  // const [sevenDayTotal , setSevenDayTotal] = useState(0);

  console.log("Auth state:", isAuthenticated);

  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  useEffect(() => {
    if (loading) return;
    if (!isAuthenticated) return;
    const fetchExpense = async () => {
      const response = await getExpenses();
      console.log("Expense context data: ", response);
      setExpenses(response);
      return response;
    };
    fetchExpense();
  }, [isAuthenticated, loading]);

  const totalExpense = expenses.reduce(
    (acc, curr) => acc + Number(curr.amount),
    0
  );

  const lastNinetyDays = 0;

  function getExpensesByCategories(cata) {
    return expenses
      .filter((e) => {
        return e.category.name === cata;
      })
      .reduce((sum, e) => sum + Number(e.amount), 0);
  }

  function getExpenseTotal(x) {
    const today = new Date();
    const xDaysAgo = new Date();
    xDaysAgo.setDate(today.getDate() - x);

    return expenses
      .filter((e) => {
        const expenseDate = new Date(e.date);
        return expenseDate >= xDaysAgo && expenseDate <= today;
      })
      .reduce((sum, e) => sum + Number(e.amount), 0);
  }

  function lastUpdated (){
    const updatedDates = expenses.map((e)=> new Date(e.updated_at));
    const lastDate = new Date(Math.max(...updatedDates))

    const currentDate = new Date();
    const difference = currentDate - lastDate;
    const diffMinutes = Math.floor(difference / (1000*60));
    
    return diffMinutes
  }

  // const lastSevenDays = expenses
  //   .filter((e) => {
  //     const expenseDate = new Date(e.date);
  //     const today = new Date();
  //     const sevenDayAgo = new Date();
  //     sevenDayAgo.setDate(today.getDate() - 7);
  //     return expenseDate >= sevenDayAgo && expenseDate <= today;
  //   })
  //   .reduce((sum, e) => sum + Number(e.amount), 0);
  // console.log("last seven day", lastSevenDays);

  const totalExpenseList = expenses.length;

  // const thisMonth = expenses
  //   .filter((e) => {
  //     const date = new Date(e.date);
  //     return (
  //       date.getMonth() === currentMonth && date.getFullYear() === currentYear
  //     );
  //   })
  //   .reduce((sum, e) => sum + Number(e.amount), 0);

  return (
    <ExpenseContext.Provider
      value={{
        totalExpenseList,
        expenses,
        totalExpense,
        getExpenseTotal,
        getExpensesByCategories,
        setExpenses,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpense = () => useContext(ExpenseContext);
