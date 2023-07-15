import React from "react";
import { useState, useEffect } from "react";
import "../assets/styles/components/DetailCardDetails.scss";
import { AnimatePresence, motion } from "framer-motion";
import GetLoanBox from "./GetLoanBox";
import { Polybase } from "@polybase/client";

const db = new Polybase({
  defaultNamespace: "pk/0x1a57dc69d2e8e6938a05bdefbebd62622ddbb64038f7347bd4fe8beb37b9bf40d5e8b62eaf9de36cbff52904b7f81bff22b29716021aaa8c11ee552112143259/CB",
});

const db_metadata = db.collection("PropertyNFTMetadata");

const DetailCardDetails = ({recordId, buttons, collateral, handleClose}) => {
  const [image, setImage] = useState('')
  const [entries, setEntries] = useState([
    ["Bedrooms", "3"],
    ["Bathrooms", "2"],
    ["Area", "2000 sqft"],
    [
      "Description",
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus ducimus ullam, commodi excepturi ipsa dolor exercitationem, natus veritatis maxime reiciendis ex iure dolorum minus iste. Voluptatibus aut laborum molestiae facilis.",
    ],
    ["Price", "1000"],
  ]);

  useEffect(() => {
    async function loadMetadata(){
     const { data } = await db_metadata.record(recordId).get()
     setImage(data.image)
     let entries=[], entry=[]
      entry = ["Property", data.type]
      entries.push(entry)
      entry = ["Address", data.address]
      entries.push(entry)
      entry = ["State, Country", data.location]
      entries.push(entry)
      entry = ["Pin", data.pincode]
      entries.push(entry)
      entry=['Property Age', data.age]
      entries.push(entry)
      entry=['Area', data.size+' sqft']
      entries.push(entry)
      entry=['Description', data.description]
      entries.push(entry)
      entry=['Estimated value', data.value+' MATIC']
      entries.push(entry)
      entry=['Google maps', <a href={data.maps} style={{color: 'lightskyblue'}}>View</a>]
      entries.push(entry)
      setEntries(entries)

    }
    loadMetadata()
  }, []);

  return (
    <>
      <div className="detail_card_details_container">
        <div className="detail_card_details_container__left">
          <div className="detail_card_details_container__left__image_container">
            <img
              className="detail_card_details_container__left__image_container__image"
              src={image}
              alt="property"
            ></img>
          </div>
        </div>
        <div className="detail_card_details_container__right">
          <div className="detail_card_details_container__right__info">
            <div className="detail_card_details_container__right__info__table">
              <div className="detail_card_details_container__right__info__table__rows">
                {entries.map((entry, index) => {
                  return (
                    <>
                      <div
                        className="detail_card_details_container__right__info__table__rows__entry_name"
                        key={index}
                      >
                        {entry[0]}
                      </div>
                      <div
                        className="detail_card_details_container__right__info__table__rows__entry_value"
                        key={index}
                      >
                        {entry[1]}
                      </div>
                    </>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="detail_card_details_container__right__button_container">
            {buttons}
          </div>
        </div>
        <AnimatePresence mode="wait">
          {collateral && (
            <motion.div
              className="my_card_detail_page_container__loan_section"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.25 }}
              exit={{ opacity: 0 }}
            >
              <GetLoanBox loanId={recordId} entries={entries} image={image} handleClose={handleClose} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default DetailCardDetails;
