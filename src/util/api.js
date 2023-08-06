export async function getCars(){
    const response = await fetch("http://localhost:8080/cars/all");
    if (!response.ok){
        throw {message: "ed to fetch cars", status: 500};
    }
    return response.json();
}
export async function  deleteCarById(id){
    await fetch(`http://localhost:8080/cars/${id}`,
        {method: "DELETE",
            headers: {"Content-type:": "application/json"}})
}