import React from 'react';
import ModalComponent from '../../../Components/UI/Modal';



const DeleteCategoryModal = (props) => {

    const {
        modalTitle,
        show,
        size,
        handleClose,
        handleDeleteButton,
        checkedArray,
    } = props;
    return (
        <ModalComponent
            modalTitle={modalTitle}
            size={size}
            show={show}
            handleClose={handleClose}
            handleDeleteButton={handleDeleteButton}
        >
            <h6>Checked Items</h6>
            {
                checkedArray.length > 0 &&
                checkedArray.map((item, index) =>
                    <li key={index}>{item.name}</li>
                )

            }
            <p>Are you sure you want to delete this category(s)?</p>
        </ModalComponent>
    )
}



export default DeleteCategoryModal;