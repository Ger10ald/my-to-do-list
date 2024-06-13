import { useState } from "react";
import propTypes from 'prop-types';

export default function FinishedListItem(props){
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleParaClick = () => {
        setIsModalOpen(_ => true);
    }

    const handleCloseModal = () => {
        setIsModalOpen(_ => false);
    }

    return(
        <li className='finished-list-item'>
            <div className="text-ctn" onClick={handleParaClick}>
                <p className="finished-text-p">{props.text}</p>
            </div>
            <div className="btn-ctn">
                <button 
                    className="delete-btn list-btn" 
                    onClick={props.onDelete}
                    aria-label="Mark as done">
                    ❌
                </button>
            </div>
            {/**
             * If modal paragraph is clicked isModalOpen is set
             * to true, displaying this on the webpage
             */}
            {isModalOpen && (
                <>
                    <div className="modal-overlay" onClick={handleCloseModal}></div>
                    <div className="modal">
                        <p className="modal-p">{props.text}</p>
                        <button className="list-btn modal-btn" onClick={handleCloseModal}>❌</button>
                    </div>
                </>
            )}
        </li>
    );
}

FinishedListItem.protoTypes = {
    onDelete: propTypes.func,
}