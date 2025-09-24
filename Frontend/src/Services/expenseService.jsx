import axios from "axios";
import axiosInstance from "./axios";

const API_URL = "http://127.0.0.1:8000/api/expenses/";
const API_PAYMENTS = "http://127.0.0.1:8000/api/paymentoption/";

// // Helper function to get auth headers
// const getAuthHeaders = () => {
//   const token = localStorage.getItem("access_token");
//   return token ? { Authorization: `Bearer ${token}` } : {};
// };   commented out cause now the thing will be handled by the interceptors

export async function getExpenses() {
  try { 
    const response = await axiosInstance.get(API_URL);
    console.log("Expenses are" , response.data)
    return response.data;
  } catch (error) {
    console.error("Error fetching expenses:", error);
    throw error;
  }
}

export async function getExpense(id) {
  try {
    const response = await axiosInstance.get(`${API_URL}${id}/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching expense ${id}:`, error);
    throw error;
  }
}

export async function createExpense(data) {
  try {
    const response = await axiosInstance.post(API_URL, data);
    console.log(response.data , "this is the create expense data")
    return response.data;
  } catch (error) {
    console.error("Error creating expense:", error);
    throw error;
  }
}

export async function updateExpense(id, data) {
  try {
    const response = await axiosInstance.put(`${API_URL}${id}/` , data);
    return response.data;
  } catch (error) {
    console.error(`Error updating expense ${id}:`, error);
    throw error;
  }
}

export async function deleteExpense(id) {
  try {
    const response = await axiosInstance.delete(`${API_URL}${id}/`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting expense ${id}:`, error);
    throw error;
  }
}

export async function getPayment() {
  try {
    const response = await axiosInstance.get(API_PAYMENTS);
    return response.data;
  } catch (error) {
    throw error;
  }
}
