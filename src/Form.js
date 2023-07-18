import React, {useState} from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import "./index.css";
import {Ripple, Input, initTE} from "tw-elements";
import {FiTrash2} from "react-icons/fi"

initTE({Ripple, Input});
export const Form = () => {
    const [isSubmitted,setIsSubmitted] = useState(false)
    const formik = useFormik({
        initialValues: {
            name: "",
            engineCapacity: "",
            engine: "PETROL",
            equipments: [],
            price: "",
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .min(2, "Must be at least 2 characters long")
                .required("Name is required!"),
            engineCapacity: Yup.number()
                .min(0.1, "Capacity should be at least 0.1!")
                .max(10.0, "Capacity should be at most 10.0!"),
            engine: Yup.mixed()
                .oneOf(["PETROL", "ELECTRIC", "DIESEL", "LPG"])
                .required("Engine is required!"),
            price: Yup.number()
                .min(1, "Minimal car price is 1 PLN")
                .required("Price is required!"),
            equipments: Yup.array().of(
                Yup.object().shape({
                    name: Yup.string().required("Equipment name is required!"),
                    price: Yup.number()
                        .min(1, "Equipment price should be at least 1!")
                        .required("Equipment price is required!"),
                })
            ),
        }),
        onSubmit: async (values, {setStatus, resetForm}) => {
            try {
                const response = await fetch("http://localhost:8080/cars", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(values),
                });

                if (response.ok) {
                    const responseData = await response.json(); // Parse response data
                    console.log("POST request succeeded");
                    console.log(responseData); // Log the response data
                    setIsSubmitted(true)
                    formik.resetForm()
                } else {
                    console.error("POST request failed")

                }
            } catch (error) {
                console.error("An error occurred during the POST request:", error);
            }
        },
    });

    const renderInput = (label, name, type) => {
        return (
            <div className="my-4">
                <label htmlFor={name} className="block text-gray-700 text-sm font-bold mb-1">
                    {label}
                </label>
                <input
                    id={name}
                    name={name}
                    type={type}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values[name]}
                    className="border-solid border-2 border-gray-300 rounded p-2 w-full"
                />
                {formik.touched[name] && formik.errors[name] ? (
                    <div className="text-red-500 text-sm mt-1">{formik.errors[name]}</div>
                ) : null}
            </div>
        );
    };

    const handleDeleteEquipment = (index) => {
        formik.setFieldValue(
            "equipments",
            formik.values.equipments.filter((_, i) => i !== index)
        );
    };

    const renderEquipmentFields = () => {
        return (
            <div className="my-4">
                <label className="block text-gray-700 text-sm font-bold mb-1">
                    Equipment
                </label>
                {formik.values.equipments.map((_, index) => (
                    <div key={index} className="flex mb-2">
                        <input
                            name={`equipments[${index}].name`}
                            placeholder="Equipment name"
                            className="border-solid border-2 border-gray-300 rounded p-2 w-full"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.equipments[index]?.name || ""}
                        />
                        <input
                            name={`equipments[${index}].price`}
                            placeholder="Equipment price"
                            className="border-solid border-2 border-gray-300 rounded p-2  w-full"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            type="number"
                            value={formik.values.equipments[index]?.price || ""}
                        />

                        <button
                            type="button"
                            className="flex items-center justify-center bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
                            onClick={() => handleDeleteEquipment(index)}
                        >
                            <FiTrash2 size={16}/>
                        </button>
                    </div>
                ))}
                {formik.touched.equipments && formik.errors.equipments ? (
                    <div className="text-red-500 text-sm mt-1">
                        {formik.errors.equipments.map((error, index) => (
                            <div key={index}>
                                {error.name && <div>{error.name}</div>}
                                {error.price && <div>{error.price}</div>}
                            </div>
                        ))}
                    </div>
                ) : null}


                <button
                    type="button"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
                    onClick={() =>
                        formik.setFieldValue("equipments", [
                            ...formik.values.equipments,
                            {name: "", price: ""},
                        ])
                    }
                >
                    Add Equipment
                </button>
            </div>
        );
    };

    return (
        <form onSubmit={formik.handleSubmit} className="max-w-sm mx-auto">
            {renderInput("Name", "name", "text")}

            {renderInput("Engine Capacity", "engineCapacity", "number")}
            <label className="block text-gray-700 text-sm font-bold mb-1">
                Engine
            </label>
            <select
                className="border-solid border-2 border-gray-300 rounded p-2 w-full"
                name="engine"
                id="engine"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.engine}
            >
                <option value="PETROL">Petrol</option>
                <option value="DIESEL">Diesel</option>
                <option value="ELECTRIC">Electric</option>
                <option value="HYBRID">Hybrid</option>
            </select>

            {renderInput("Price", "price", "number")}

            {renderEquipmentFields()}

            {isSubmitted && (
                <div className="text-green-500 text-sm mt-1">Car created successfully!</div>
            )}
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                type="submit"
            >
                Create
            </button>
        </form>
    );
};
