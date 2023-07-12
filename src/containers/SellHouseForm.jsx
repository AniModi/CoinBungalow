import React, { useState } from 'react';
import "../assets/styles/containers/SellHouseForm.scss";
import Navbar from '../components/Navbar';
import InputBox from '../components/InputBox';


const SellHouseForm = () => {
    const form = [
        {
            label: "Property age",
            name: "age",
            placeholder: "Newly Constructed | X years",
            type: "text",
            value: ""
        },
        {
            label: "Property type",
            name: "type",
            placeholder: "Apartment | Villa | Independent House",
            type: "text",
            value: ""
        },
        {
            label: "Property size",
            name: "size",
            placeholder: "1000 sqft",
            type: "text",
            value: ""
        },
        {
            label: "Address",
            name: "address",
            placeholder: "Address",
            type: "text",
            value: ""
        },
        {
            label: "City",
            name: "city",
            placeholder: "City, State",
            type: "text",
            value: ""
        },
        {
            label: "Pincode",
            name: "pincode",
            placeholder: "Pincode",
            type: "number",
            value: ""
        },
        {
            label: "Google map link",
            name: "link",
            placeholder: "Google map link",
            type: "text",
            value: ""
        },
        {
            label: "Price",
            name: "price",
            placeholder: "Price",
            type: "number",
            value: ""
        },
        {
            label: "Images",
            name: "images",
            placeholder: "Images",
            type: "file",
            value: ""
        },
        {
            label: "Title Deed",
            name: "title_deed",
            placeholder: "Title Deed",
            type: "file",
            value: ""
        },
    ];

    const [formState, setFormState] = useState({
        age: "",
        type: "",
        size: "",
        address: "",
        city: "",
        pincode: "",
        price: "",
        images: "",
        title_deed: "",
        link: ""
    });

    const handleInput = (event) => {
        if(event.target.type === "file") {
            setFormState({
                ...formState,
                [event.target.name]: event.target.files
            });
            return;
        }
        setFormState({
            ...formState,
            [event.target.name]: event.target.value
        });
    };
    const handleSubmit = () => {
        console.log(formState);
    };
    return(
        <>
        <Navbar></Navbar>
        <div className='sell_house_form_container'>
            <div className="sell_house_form_container_left">
                <div className='sell_house_form_container_left_image'></div>
            </div>
            <div className="sell_house_form_container_right">
                <div className='sell_house_form_container_right_form_container'>
                    {form.map((item, index) => {
                        return(
                            <InputBox key={index} label={item.label} name={item.name} placeholder={item.placeholder} type={item.type} value={formState[item.name]} onChange = {handleInput}></InputBox>
                        );
                    })}
                    <button className='sell_house_form_container_right_form_container_button' onClick={handleSubmit}>Submit</button>
                </div>
            </div>
        </div>
        </>
    );
};

export default SellHouseForm;