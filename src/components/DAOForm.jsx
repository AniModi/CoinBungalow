import React from "react";
import "../assets/styles/components/ProposalForm.scss";

const DAOForm = () => {
  return (
    <>
      <div className="proposal_form_container">
        <div className="proposal_form_container__title">Create DAO</div>
        <div className="proposal_form_container__form">
          <div className="proposal_form_container__form__input_container">
            <div className="proposal_form_container__form__input_container__title">
              Name
            </div>
            <input
              className="proposal_form_container__form__input_container__input"
              type="text"
              placeholder="DAO Name"
            ></input>
          </div>
          <div className="proposal_form_container__form__input_container">
            <div className="proposal_form_container__form__input_container__title">
              Description
            </div>
            <textarea
              className="proposal_form_container__form__input_container__input"
              placeholder="DAO Description"
            ></textarea>
          </div>
          <div className="proposal_form_container__form__input_container">
            <div className="proposal_form_container__form__input_container__title">
              Goal
            </div>
            <textarea
              className="proposal_form_container__form__input_container__input"
              placeholder="DAO Goal"
            ></textarea>
          </div>
          <div className="proposal_form_container__form__input_container">
            <div className="proposal_form_container__form__input_container__title">
              Started 
            </div>
            <input
              className="proposal_form_container__form__input_container__input"
              type="date"
              placeholder="Proposal start date"
            ></input>
          </div>
          <div className="proposal_form_container__form__input_container">
            <div className="proposal_form_container__form__input_container__title">
              Subscription price
            </div>
            <input
              className="proposal_form_container__form__input_container__input"
              type="number"
              placeholder="&#8377;/month"
            ></input>
          </div>
        </div>
        <div className="proposal_form_container__button_container">
            <button className="proposal_form_container__button_container__button">
                Create
            </button>
        </div>
      </div>
    </>
  );
};

export default DAOForm;
