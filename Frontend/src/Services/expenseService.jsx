import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/expenses/";
const API_PAYMENTS = "http://127.0.0.1:8000/api/paymentoption/";

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem("access_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export async function getExpenses() {
  try {
    const response = await axios.get(API_URL, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching expenses:", error);
    throw error;
  }
}

export async function getExpense(id) {
  try {
    const response = await axios.get(`${API_URL}${id}/`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching expense ${id}:`, error);
    throw error;
  }
}

export async function createExpense(data) {
  try {
    const response = await axios.post(API_URL, data, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("Error creating expense:", error);
    throw error;
  }
}

export async function updateExpense(id, data) {
  try {
    const response = await axios.put(`${API_URL}${id}/`, data, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating expense ${id}:`, error);
    throw error;
  }
}

export async function deleteExpense(id) {
  try {
    const response = await axios.delete(`${API_URL}${id}/`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error(`Error deleting expense ${id}:`, error);
    throw error;
  }
}

export async function getPayment() {
  try {
    const response = await axios.get(API_PAYMENTS);
    return response.data;
  } catch (error) {
    throw error;
  }
}
