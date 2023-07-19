import React from 'react';
import "../assets/styles/containers/DAOPage.scss"
import Navbar from "../components/Navbar"
import ProposalCard from './ProposalCard';


const DAOPage = () => {
    const props = {
        title: "Proposal Title",
        date: "12/12/2021 - 12/12/2021",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl vitae aliquam ultricies, nunc nisl ultricies nunc, vitae aliquam nisl nisl vitae aliquam ultricies, nunc nisl ultricies nunc, vitae aliquam nisl",
    }
    return (
        <>
            <Navbar></Navbar>
            <div className="dao_page_container">
                <div className='dao_page_container__banner'>
                    <div className='dao_page_container__banner__tabs'>
                        <div className='dao_page_container__banner__tabs__value'>All Proposals</div>
                        <div className='dao_page_container__banner__tabs__value'>Create Proposal</div>
                    </div>
                </div>
                <div className='dao_page_container__proposals'>
                    <div className='dao_page_container__proposals__proposal'>
                        <ProposalCard props={props}></ProposalCard>
                    </div>
                    <div className='dao_page_container__proposals__proposal'>
                        <ProposalCard props={props}></ProposalCard>
                    </div>
                    <div className='dao_page_container__proposals__proposal'>
                        <ProposalCard props={props}></ProposalCard>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DAOPage;