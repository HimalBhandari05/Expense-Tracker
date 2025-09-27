import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { ExpenseProvider } from "./context/expenseContext.jsx";
import { CategoryProvider } from "./context/categoryContext.jsx";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <CategoryProvider>
      <ExpenseProvider>
        <App />
      </ExpenseProvider>
    </CategoryProvider>
  </AuthProvider>
);
