import React from 'react';
import ModalComponent from '../../../Components/UI/Modal';
import Input from '../../../Components/UI/input'
import { Row, Col, } from 'react-bootstrap';


const UpdateCategoriesModal = (props) => {

    const {
            show,
            modalTitle,
            handleClose,
            handleUpdateButton,
            size,
            expandedArray,
            checkedArray,
            handleCategoryInput,
            categoryList,
            setCategoryName
        } = props

    return (
        <ModalComponent
            show={show}
            modalTitle={modalTitle}
            handleClose={handleClose}
            handleUpdateButton={handleUpdateButton}
            size={size}
        >
            <Row>
                <Col><h6>Expanded</h6></Col>
            </Row>
            {
                expandedArray.length > 0 &&
                expandedArray.map((item, index) =>
                    <Row key={index}>
                        <Col>
                            <Input
                                value={item.name}
                                placeholder={`Category Name`}
                                onChange={(e) => handleCategoryInput('name', e.target.value, index, 'expanded')}
                            />
                        </Col>
                        <Col>
                            <select
                                label="Category Name"
                                onChange={(e) => setCategoryName}
                                className="form-control"
                                value={item.parentId}
                                onChange={(e) => handleCategoryInput('parentId', e.target.value, index, 'expanded')}>
                                <option>Select Category</option>
                                {
                                    categoryList.map(option => <option key={option.value} value={option.value}>{option.name}</option>)
                                }
                            </select>
                        </Col>
                        <Col>
                            <select className="form-control">
                                <option value="">Select type</option>
                                <option value="store">Store</option>
                                <option value="product">Product</option>
                                <option value="page">Page</option>
                            </select>
                        </Col>
                        {/* <br></br> */}
                        {/* <br></br> */}
                        {/* <input label="Category Image" type='file' name="categoryImage" onChange={handleCategoryImage} /> */}
                        <br></br>
                        <br></br>
                    </Row>
                )
            }
            <Row>
                <Col><h6>Checked</h6></Col>
            </Row>
            {
                checkedArray.length > 0 &&
                checkedArray.map((item, index) =>
                    <Row key={index}>
                        <Col>
                            <Input
                                value={item.name}
                                placeholder={`Category Name`}
                                onChange={(e) => handleCategoryInput('name', e.target.value, index, 'checked')}
                            />
                        </Col>
                        <Col>
                            <select
                                label="Category Name"
                                onChange={(e) => setCategoryName}
                                className="form-control"
                                value={item.parentId}
                                onChange={(e) => handleCategoryInput('parentId', e.target.value, index, 'checked')}>
                                <option>Select Category</option>
                                {
                                    categoryList.map(option => <option key={option.value} value={option.value}>{option.name}</option>)
                                }
                            </select>
                        </Col>
                        <Col>
                            <select className="form-control">
                                <option value="">Select type</option>
                                <option value="store">Store</option>
                                <option value="product">Product</option>
                                <option value="page">Page</option>
                            </select>
                        </Col>
                        {/* <br></br> */}
                        {/* <br></br> */}
                        {/* <input label="Category Image" type='file' name="categoryImage" onChange={handleCategoryImage} /> */}
                        <br></br>
                        <br></br>
                    </Row>
                )
            }
        </ModalComponent>

    )
}


export default UpdateCategoriesModal;