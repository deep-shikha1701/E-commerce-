import React, {  useState } from 'react';
import { Container, Row, Col, } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory } from '../../actions';
import Layout from '../../Components/Layouts';
import Input from '../../Components/UI/input';
import ModalComponent from '../../Components/UI/Modal';


function Category() {

    const category = useSelector(state => state.category)
    const [categoryName, setCategoryName] = useState('');
    const [parentCategoryId, setParentCategoryId] = useState('');
    const [categoryImage, setCategoryImage] = useState('');
    const [modalShow, setModalShow] = useState(false);
    const dispatch = useDispatch();

    const renderCategories = (categories) => {

        let mycategories = [];
        if (categories) {
            for (let category of categories) {
                mycategories.push(
                    <li key={category.name}>
                        {category.name}
                        {category.children.length > 0 ? (<ul>{renderCategories(category.children)}</ul>) : null}
                    </li>
                )
            }
        }
        return mycategories
    }


    const createCategoryList = (categories, options = []) => {
    if(categories){
        for (let category of categories) {
            options.push({ value: category._id, name: category.name });
            if (category.children.length > 0) {
                createCategoryList(category.children, options);
            }
        }
    }

        return options;
    }

    const handleCategoryImage = (e) => {
        setCategoryImage(e.target.files[0]);
    }

    const handleAddCategory = (e) => {

        const form = new FormData();
        // const cat = {
        //     categoryName,
        //     parentCategoryId,
        //     categoryImage
        // }

        form.append('name', categoryName);
        form.append('parentId', parentCategoryId);
        form.append('categoryImage', categoryImage);
        dispatch(addCategory(form));
        setCategoryName('');
        setParentCategoryId('');


        // console.log(cat);

        setModalShow(false)
    }

    const handleCloseButton = () => {
        setModalShow(false);
    }


    return (
        <Layout sidebar>
            <Container>
                <Row>
                    <Col md={12}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h3>Category</h3>
                            <button onClick={() => setModalShow(true)}>Add</button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <ul>
                            {renderCategories(category.categories)}
                            {/* {JSON.stringify(createCategoryList(category.categories))} */}
                        </ul>
                    </Col>
                </Row>
            </Container>
            <ModalComponent
                show={modalShow}
                modalTitle="Add Category"
                handleClose={handleCloseButton}
                handleAddButton={handleAddCategory}
            >
                <Input
                    label="Name"
                    value={categoryName}
                    placeholder={`Category Name`}
                    onChange={(e) => setCategoryName(e.target.value)}
                />
                <select label="Category Name" onChange={(e) => setCategoryName} className="form-control" value={parentCategoryId} onChange={(e) => { setParentCategoryId(e.target.value) }}>
                    <option>Select Category</option>
                    {
                        createCategoryList(category.categories).map(option => <option key={option.value} value={option.value}>{option.name}</option>)
                    }
                </select>
                <input label="Category Image" type='file' name="categoryImage" onChange={handleCategoryImage} />
            </ModalComponent>
        </Layout >
    )
}

export default Category
