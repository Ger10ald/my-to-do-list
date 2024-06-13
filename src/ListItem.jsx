import PropTypes from 'prop-types';
import { useState } from 'react';

export default function ListItem(props) {
    
    /**
     * Create a stateful variable to keep track of the state of 
     * the pop window when user clicks on paragraph element
     */
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [modalText, setModalText] = useState(props.text);

    const handleParaClick = () => {
        setIsModalOpen(_ => true);
        setIsEdit(_ => false);
    }

    const handleCloseModal = () => {
        setIsModalOpen(_ => false);
        setIsEdit(_ => false);
    }

    const handleChangeText = () => {
        setIsEdit(_ => true);
        setIsModalOpen(_ => true);
        setModalText(props.text);
    }
    
    const handleModalTextChange = (event) => {
        setModalText(_ => event.target.value);
    }

    const handleSaveModalText = () => {
        /**
         *  Here we pass the updated text to the parent component
         * How does this work, IDK. I thought data only flowed from parent component
         * to children components
         * */
        props.onHandleChangeText(modalText);
        setIsModalOpen(false);
    }

    return(
        <li className='unfinished-list-item'>
            <div className="text-ctn" onClick={handleParaClick}>
                <p className="idx-p">{props.idx}.</p>
                <p className="text-p" >{props.text}</p>
            </div>
            <div className="btn-ctn">
                <button 
                    className="move-up-btn list-btn" 
                    onClick={props.onMoveUp}
                    aria-label="Move up">
                    ⬆️
                </button>
                <button 
                    className="move-down-btn list-btn" 
                    onClick={props.onMoveDown}
                    aria-label="Move down">
                    ⬇️
                </button>
                <button 
                    className="edit-btn list-btn" 
                    onClick={() => {
                            props.onHandleChangeText(modalText, props.idx-1);
                            handleChangeText();
                    }}
                    aria-label="Edit">
                    ✏️
                </button>
                <button 
                    className="delete-btn list-btn" 
                    onClick={props.onDelete}
                    aria-label="Mark as done">
                    ✔️
                </button>
            </div>
            {/**
             * If modal paragraph is clicked isModalOpen is set
             * to true, displaying this on the webpage
             */}
            {isModalOpen && (
                <>
                    <div className="modal-overlay" ></div>
                    <div className="modal">
                        
                        {!isEdit ? 
                                <>
                                    <p className="modal-p">{props.text}</p> 
                                    <button className="modal-btn list-btn" onClick={handleCloseModal}>❌</button> 
                                </> : 
                                <>
                                    <textarea onChange={handleModalTextChange} value={modalText} className="modal-textarea"></textarea>
                                    <button className="save-btn modal-btn list-btn" onClick={handleSaveModalText}>Save</button> 
                                </>}
                    </div>
                </>
            )}
        </li>
    );
}

ListItem.propTypes = {
    idx: PropTypes.number,
    text: PropTypes.string,
    onDelete: PropTypes.func,
    onMoveUp: PropTypes.func,
    onMoveDown: PropTypes.func,
    onHandleChangeText: PropTypes.func,
}