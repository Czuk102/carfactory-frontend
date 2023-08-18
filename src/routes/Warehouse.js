import React, { useState, useEffect } from 'react';
import Cars from "../Cars";
import {deleteCarById, getCars} from "../util/api";
import {useLoaderData} from "react-router-dom";

export default function Warehouse() {
    const loaderData = useLoaderData();
    const [carList, setCarList] = useState(loaderData || []);

    useEffect(() => {
        if (!loaderData) {
            getCars()
                .then((data) => setCarList(data.results))
                .catch((error) => console.error("Failed to fetch cars:", error));
        }
    }, [loaderData]);

    const handleDeleteCar = (id) => {
        deleteCarById(id)
            .then(() => {

                setCarList((prevCarList) => prevCarList.filter((car) => car.id !== id));
            })
            .catch((error) => console.error("Failed to delete car:", error));
    };

    return (
        <Cars onDeleteCar={handleDeleteCar} carList={carList}/>
    );
};
export function loader(){
    return getCars();
}
