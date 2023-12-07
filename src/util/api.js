import axios from "axios";

const API_URL = "http://localhost:8080";
export async function getCars(){
    const response = await axios.get(`${API_URL}/cars/all`);

    return response.data;
}
export async function  deleteCarById(id){
    await axios.delete(`${API_URL}/cars/${id}`);
}