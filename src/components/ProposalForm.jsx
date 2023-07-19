import React from "react";
import "../assets/styles/components/ProposalForm.scss";

const ProposalForm = () => {
  return (
    <>
      <div className="proposal_form_container">
        <div className="proposal_form_container__title">Create Proposal</div>
        <div className="proposal_form_container__form">
          <div className="proposal_form_container__form__input_container">
            <div className="proposal_form_container__form__input_container__title">
              Title
            </div>
            <input
              className="proposal_form_container__form__input_container__input"
              type="text"
              placeholder="Proposal Title"
            ></input>
          </div>
          <div className="proposal_form_container__form__input_container">
            <div className="proposal_form_container__form__input_container__title">
              Description
            </div>
            <textarea
              className="proposal_form_container__form__input_container__input"
              placeholder="Proposal Description"
            ></textarea>
          </div>
          <div className="proposal_form_container__form__input_container">
            <div className="proposal_form_container__form__input_container__title">
              Start Date
            </div>
            <input
              className="proposal_form_container__form__input_container__input"
              type="date"
              placeholder="Proposal start date"
            ></input>
          </div>
          <div className="proposal_form_container__form__input_container">
            <div className="proposal_form_container__form__input_container__title">
              End Date
            </div>
            <input
              className="proposal_form_container__form__input_container__input"
              type="date"
              placeholder="Proposal end date"
            ></input>
          </div>
          <div className="proposal_form_container__form__input_container">
            <div className="proposal_form_container__form__input_container__title">
              Proposal Value
            </div>
            <input
              className="proposal_form_container__form__input_container__input"
              type="number"
              placeholder="Proposal Value"
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

export default ProposalForm;
