import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/LoginPage";
import AddExpense from "./components/AddExpense";
import PrivateRoutes from "./utils/ProtectedRoute";
import ExpenseDetail from "./components/ExpenseDetail";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/addexpenses" element={<AddExpense />} />
            <Route path="/" element={<Home />} />
          </Route>
          <Route path="/expensedetail" element={ <ExpenseDetail/> } />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
