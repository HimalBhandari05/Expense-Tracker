import axios from "axios";
import axiosInstance from "./axios";

const API_URL = "http://127.0.0.1:8000/api/categories/";

export async function getCategories() {
  try {
    const response = await axiosInstance.get(API_URL);
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
}

export async function getCategory(id) {
  try {
    const response = await axiosInstance.get(`${API_URL}${id}/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching category ${id}:`, error);
    throw error;
  }
}

export async function createCategory(data) {
  try {
    const response = await axiosInstance.post(API_URL, data);
    return response.data;
  } catch (error) {
    console.error("Error creating category:", error);
    throw error;
  }
}

export async function updateCategory(id, data) {
  try {
    const response = await axiosInstance.put(`${API_URL}${id}/`, data);
    return response.data;
  } catch (error) {
    console.error(`Error updating category ${id}:`, error);
    throw error;
  }
}

export async function deleteCategory(id) {
  try {
    const response = await axiosInstance.delete(`${API_URL}${id}/`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting category ${id}:`, error);
    throw error;
  }
}
