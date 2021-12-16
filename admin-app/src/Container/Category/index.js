import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategory, addCategory } from '../../actions';
import Layout from '../../Components/Layouts';
import Input from '../../Components/UI/input';


function Category() {

    const category = useSelector(state => state.category)
    const [categoryName, setCategoryName] = useState('');
    const [parentCategoryId, setParentCategoryId] = useState('');
    const [categoryImage, setCategoryImage] = useState('');
    const [modalShow, setModalShow] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllCategory());
    }, [])

    const renderCategories = (categories) => {

        let mycategories = [];
        for (let category of categories) {
            mycategories.push(
                <li key={category.name}>
                    {category.name}
                    {category.children.length > 0 ? (<ul>{renderCategories(category.children)}</ul>) : null}
                </li>
            )
        }
        return mycategories
    }


    const createCategoryList = (categories, options = []) => {
        for (let category of categories) {
            options.push({ value: category._id, name: category.name });
            if (category.children.length > 0) {
                createCategoryList(category.children, options);
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

        // console.log(cat);

        setModalShow(false)
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
                            {JSON.stringify(createCategoryList(category.categories))}
                        </ul>
                    </Col>
                </Row>
            </Container>
            <Modal
                show={modalShow}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Add New Category    
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Input
                        value={categoryName}
                        placeholder={`Category Name`}
                        onChange={(e) => setCategoryName(e.target.value)}
                    />
                    <select className="form-control" value={parentCategoryId} onChange={(e) => { setParentCategoryId(e.target.value) }}>
                        <option>Select Category</option>
                        {
                            createCategoryList(category.categories).map(option => <option key={option.value} value={option.value}>{option.name}</option>)
                        }
                    </select>
                    <input type='file' name="categoryImage" onChange={handleCategoryImage} />
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => setModalShow(false)}>Close</Button>
                    <Button onClick={handleAddCategory}>Add</Button>
                </Modal.Footer>
            </Modal>
        </Layout >
    )
}

export default Category
