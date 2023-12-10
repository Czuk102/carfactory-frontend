import React, { useState, useEffect } from 'react';
import Cars from "../Cars";
import { deleteCarById, getCars } from "../util/api";

export default function Warehouse() {
    const [carList, setCarList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const data = await getCars();
                setCarList(data);
            } catch (error) {
                console.error("Failed to fetch cars:", error);
                setError("Failed to fetch cars. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleDeleteCar = (id) => {
        deleteCarById(id)
            .then(() => {
                setCarList((prevCarList) => prevCarList.filter((car) => car.id !== id));
            })
            .catch((error) => console.error("Failed to delete car:", error));
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <Cars onDeleteCar={handleDeleteCar} carList={carList}/>
    );
}
