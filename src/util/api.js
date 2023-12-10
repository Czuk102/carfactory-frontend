import axios from "axios";

const API_URL = "http://localhost:8080";

export async function getCars() {
    const response = await axios.get(`${API_URL}/cars/all`, {
        headers: {
            "Content-Type": "application/json",
            withCredentials: true,
        }
    });

    return response.data;
}

export async function deleteCarById(id) {
    await axios.delete(`${API_URL}/cars/${id}`, {
        headers: {
            "Content-Type": "application/json",
            withCredentials: true,
        }
    });
}

export async function login(username, password) {
    const response = await axios.post(`${API_URL}/token`, {}, {
        headers: {
            "Content-Type": "application/json",
        },
        auth: {
            username,
            password
        }
    });

    return response;
}