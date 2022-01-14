import React from 'react';



const DeleteCategoryModal = (props) => {

    const {
        modalTitle,
        show,
        size,
        handleClose,
        handleDeleteButton,
        checkedArray
        setDeleteModalShow
    } = props;
    return (
        <ModalComponent
            modalTitle="Confirm Delete"
            size='md'
            show={deleteModalShow}
            handleClose={() => setDeleteModalShow(false)}
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