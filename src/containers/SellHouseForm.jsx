import React, { useState } from 'react';
import "../assets/styles/containers/SellHouseForm.scss";
import Navbar from '../components/Navbar';
import InputBox from '../components/InputBox';
import { PnftAddress, PnftAbi, PdealAddress, PdealAbi } from '../constants';
import { writeContract, readContract } from 'wagmi/actions';
import lighthouse from '@lighthouse-web3/sdk';
import { Polybase } from "@polybase/client";

const db = new Polybase({
  defaultNamespace: "pk/0x1a57dc69d2e8e6938a05bdefbebd62622ddbb64038f7347bd4fe8beb37b9bf40d5e8b62eaf9de36cbff52904b7f81bff22b29716021aaa8c11ee552112143259/CB",
});
const db_metadata = db.collection('PropertyNFTMetadata')

const apiKey = 'a479e403.cac0fbe03f9b43cf8875c512a8321308'

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
            placeholder: "Apartment | Villa | Independent House | Land",
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
            label: "Property description",
            name: "desc",
            placeholder: "No. of rooms, bathrooms, swimming pool, etc.",
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
            label: "Location",
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
            label: "Google maps link",
            name: "link",
            placeholder: "Google maps link",
            type: "text",
            value: ""
        },
        {
            label: "Estimated value",
            name: "price",
            placeholder: "Estimated value",
            type: "number",
            value: ""
        },
        {
            label: "Property Images",
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
    
    const defaultFormState = {
        age: "",
        type: "",
        size: "",
        desc: "",
        address: "",
        city: "",
        pincode: "",
        price: "",
        images: "",
        title_deed: "",
        link: ""
    }
    const [formState, setFormState] = useState(defaultFormState);

    const handleInput = async(event) => {
        if(event.target.type === "file") {
            setFormState({
                ...formState,
                [event.target.name]: event.target.files
            });
            console.log(event.target.files);
            return;
        }
        setFormState({
            ...formState,
            [event.target.name]: event.target.value
        });
    };
    const progressCallback = (progressData) => {
        let percentageDone =
          100 - (progressData?.total / progressData?.uploaded)?.toFixed(2);
        console.log(percentageDone);
      };

    const uploadImages = async (images) => {
        if(images.length === 0) return;
        let _images;
        let links = [];

        for(let i=0; i<images.length; i++) {
            const file = images[i];
            _images = [file];
            const response = await lighthouse.upload(_images, apiKey, progressCallback);
            console.log('Visit at https://gateway.lighthouse.storage/ipfs/' + response.data.Hash)
            const link = 'https://gateway.lighthouse.storage/ipfs/' + response.data.Hash;
            links.push(link);
        }
        return links;
    }

    const uploadTitleDeed = async (title_deed) => {
        if(title_deed.length === 0) return;
        const response = await lighthouse.upload(title_deed, apiKey, progressCallback);
        console.log('Visit at https://gateway.lighthouse.storage/ipfs/' + response.data.Hash)
        const link = 'https://gateway.lighthouse.storage/ipfs/' + response.data.Hash;
        return link;
    }

    const handleSubmit = async () => {
        const imagesLink = await uploadImages(formState.images);
        const titleDeedLink = await uploadTitleDeed(formState.title_deed);
        const totalSupply = await readContract({
            address: PnftAddress,
            abi: PnftAbi,
            functionName: "totalSupply",
        });
        const recordId = (parseInt(totalSupply.toString()) +1).toString();
        const recordData = await db_metadata.create([
            recordId,
            'Property NFT ',
            imagesLink[0],
            formState.age,
            formState.type,
            formState.size,
            formState.desc,
            formState.address,
            formState.city,
            formState.pincode,
            formState.link,
            formState.price,
            imagesLink,
            titleDeedLink
        ]);

 const url = `https://testnet.polybase.xyz/v0/collections/pk%2F0x1a57dc69d2e8e6938a05bdefbebd62622ddbb64038f7347bd4fe8beb37b9bf40d5e8b62eaf9de36cbff52904b7f81bff22b29716021aaa8c11ee552112143259%2FCB%2FPropertyNFTMetadata/records/${recordId}`+'?format=nft`';
        console.log('visit at --> ', url)

        const tokenId = await writeContract({  
            address: PnftAddress,
            abi: PnftAbi,
            functionName: "mint",
            args: [url],
        });
        console.log(tokenId);
        setFormState(defaultFormState);
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