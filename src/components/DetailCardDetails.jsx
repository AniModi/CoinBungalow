import React from "react";
import "../assets/styles/components/DetailCardDetails.scss";
import { AnimatePresence, motion } from "framer-motion";
import GetLoanBox from "./GetLoanBox";

const DetailCardDetails = ({buttons, collateral, handleClose, loanId}) => {
  const image =
    "https://img.freepik.com/free-photo/modern-residential-district-with-green-roof-balcony-generated-by-ai_188544-10276.jpg?w=1380&t=st=1688985038~exp=1688985638~hmac=e07c8fd49bea88bb8dd3df993178ec1c2b9c9c434df44392629f40e5dc2b4bb4";

  const entries = [
    ["Bedrooms", "3"],
    ["Bathrooms", "2"],
    ["Area", "2000 sqft"],
    [
      "Description",
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus ducimus ullam, commodi excepturi ipsa dolor exercitationem, natus veritatis maxime reiciendis ex iure dolorum minus iste. Voluptatibus aut laborum molestiae facilis.",
    ],
    ["Price", "1000"],
  ];
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
              <GetLoanBox loanId={loanId} handleClose={handleClose} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default DetailCardDetails;
