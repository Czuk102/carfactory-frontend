import React, { useState, useEffect } from 'react';
import Cars from "./Cars";
import {getCars} from "./util/api";
import {useLoaderData} from "react-router-dom";

export default function Warehouse() {
    const loaderData = useLoaderData()
    
    return (
        <Cars carList={loaderData}/>
    );
};
export function loader(){
    return getCars();
}
