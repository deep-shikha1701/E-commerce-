import React from 'react';
import ModalComponent from '../../../Components/UI/Modal';
import Input from '../../../Components/UI/input'
import { Container, Row, Col, } from 'react-bootstrap';


const AddCategoryModal = (props) => {

    const {
        show,
        modalTitle,
        handleClose,
        handleAddButton,
        size,
        setCategoryName,
        categoryName,
        categoryList,
        handleCategoryImage,
        parentCategoryId,
        setParentCategoryId
    } = props;

    return (
        <ModalComponent
            show={show}
            modalTitle={modalTitle}
            handleClose={handleClose}
            handleAddButton={handleAddButton}
            size={size}
        >
            <Row>
                <Col>
                    <Input
                        value={categoryName}
                        placeholder={`Category Name`}
                        onChange={(e) => setCategoryName(e.target.value)}
                    />
                </Col>
                <Col>
                    <select label="Category Name" onChange={(e) => setCategoryName} className="form-control" value={parentCategoryId} onChange={(e) => { setParentCategoryId(e.target.value) }}>
                        <option>Select Category</option>
                        {
                            categoryList.map(option => <option key={option.value} value={option.value}>{option.name}</option>)
                        }
                    </select>
                </Col>
            </Row>
            <br></br>
            <Row>
                <input label="Category Image" type='file' name="categoryImage" onChange={handleCategoryImage} />
            </Row>
        </ModalComponent>
    )
}


export default AddCategoryModal;