import React, { useState, useEffect } from 'react';
import CheckboxTree from 'react-checkbox-tree';
import { Container, Row, Col, } from 'react-bootstrap';
import { FiSquare, FiCheckSquare, FiChevronRight, FiChevronDown } from "react-icons/fi";
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory, updateCategories, getAllCategory ,deleteCategories} from '../../actions';
import Layout from '../../Components/Layouts';
import UpdateCategoriesModal from './components/updateCategoryModal';
import AddCategoryModal from './components/addCategoryModal';
import DeleteCategoryModal from './components/deleteCategoryModal';


function Category() {

    const category = useSelector(state => state.category)
    const [categoryName, setCategoryName] = useState('');
    const [parentCategoryId, setParentCategoryId] = useState('');
    const [categoryImage, setCategoryImage] = useState('');
    const [addModalShow, setAddModalShow] = useState(false);
    const [updateModalShow, setUpdateModalShow] = useState(false);
    const [deleteModalShow, setDeleteModalShow] = useState(false);
    const dispatch = useDispatch();

    const [checked, setChecked] = useState([])
    const [expanded, setExpanded] = useState([])
    const [checkedArray, setCheckedArray] = useState([]);
    const [expandedArray, setExpandedArray] = useState([]);

    const renderCategories = (categories) => {

        let mycategories = [];
        if (categories) {
            for (let category of categories) {
                mycategories.push(
                    {
                        label: category.name,
                        value: category._id,
                        children: category.children.length > 0 && renderCategories(category.children)
                    }
                )
            }
        }
        return mycategories
    }


    const createCategoryList = (categories, options = []) => {
        if (categories) {
            for (let category of categories) {
                options.push({ value: category._id, name: category.name, parentId: category.parentId });
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
        form.append('name', categoryName);
        form.append('parentId', parentCategoryId);
        form.append('categoryImage', categoryImage);
        dispatch(addCategory(form));
        setCategoryName('');
        setParentCategoryId('');

        setAddModalShow(false)
    }

    const handleUpdateButton = () => {
        const form = new FormData();
        expandedArray.forEach((item, index) => {
            form.append('_id', item.value);
            form.append('name', item.name);
            form.append('parentId', item.parentId ? item.parentId : "");
            form.append('type', item.type)
        })
        checkedArray.forEach((item, index) => {
            form.append('_id', item.value);
            form.append('name', item.name);
            form.append('parentId', item.parentId ? item.parentId : "");
            form.append('type', item.type)

        })
        dispatch(updateCategories(form)).then(
            result => {
                if (result) {
                    dispatch(getAllCategory())
                }
            }
        )
        setUpdateModalShow(false);
    }

    const handleDeleteButton = () => {
        const deleteItemsArray = checkedArray.map((item, index) =>({_id: item.value}));
        dispatch(deleteCategories(deleteItemsArray)).then(
            result => {
                if (result) {
                    dispatch(getAllCategory())
                }
            }
        )
        setDeleteModalShow(false);
    }

    const updateCheckednExpandedArray = () => {
        const categories = createCategoryList(category.categories);
        const checkedArray = []
        const expandedArray = []
        checked.length > 0 && checked.forEach((categoryId, index) => {
            const category = categories.find((category, _index) => categoryId === category.value)
            category && checkedArray.push(category)
        })

        expanded.length > 0 && expanded.forEach((categoryId, index) => {
            const category = categories.find((category, _index) => categoryId === category.value)
            category && expandedArray.push(category)
        })
        setCheckedArray(checkedArray);
        setExpandedArray(expandedArray);

    }

    const handleCategoryInput = (key, value, index, type) => {
        if (type === 'checked') {
            const updatedCheckedArray = checkedArray.map((item, _index) => index === _index ? { ...item, [key]: value } : item);
            setCheckedArray(updatedCheckedArray);
        } else if (type === 'expanded') {
            const updatedExpandedArray = checkedArray.map((item, _index) => index === _index ? { ...item, [key]: value } : item);
            setExpanded(updatedExpandedArray);

        }
    }


    const categoryList = createCategoryList(category.categories);

    return (
        <Layout sidebar>
            <Container>
                <Row>
                    <Col md={12}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h3>Category</h3>
                            <button onClick={() => { setAddModalShow(true) }} >Add</button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        {/* <ul>
                            {renderCategories(category.categories)}
                        </ul> */}
                        <CheckboxTree
                            nodes={renderCategories(category.categories)}
                            checked={checked}
                            expanded={expanded}
                            onCheck={checked => setChecked(checked)}
                            onExpand={expanded => setExpanded(expanded)}
                            icons={{
                                check: <FiCheckSquare />,
                                uncheck: <FiSquare />,
                                halfCheck: <FiSquare />,
                                expandClose: <FiChevronRight />,
                                expandOpen: <FiChevronDown />,
                            }}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <button onClick={() => { setUpdateModalShow(true); updateCheckednExpandedArray(); }}>Update</button>
                        <button onClick={() => { setDeleteModalShow(true); updateCheckednExpandedArray(); }}>Delete</button>
                    </Col>
                </Row>

            </Container>
            {/* {renderAddCategoryModal()} */}
            {/* Modal to Update a Category */}
            <AddCategoryModal
                show={addModalShow}
                modalTitle="Add Category"
                handleClose={()=>setAddModalShow(false)}
                handleAddButton={handleAddCategory}
                categoryList={categoryList}
                handleCategoryImage={handleCategoryImage} 
                categoryName={categoryName}    
                size="sm"
                setCategoryName={setCategoryName}
                parentCategoryId={parentCategoryId}
                setParentCategoryId={setParentCategoryId}
            />
            {/* {renderUpdateCategoriesModal()} */}
            <UpdateCategoriesModal
                show={updateModalShow}
                modalTitle="Update Category"
                handleClose={() => setUpdateModalShow(false)}
                handleUpdateButton={handleUpdateButton}
                expandedArray={expandedArray}
                checkedArray={checkedArray}
                handleCategoryInput={handleCategoryInput}
                size='lg'
                setCategoryName={setCategoryName}
                categoryList={categoryList}
                category={category}
            />
            {/* {renderDeleteCategoryModal()} */}
            <DeleteCategoryModal
                modalTitle="Confirm Delete"
                size='md'
                show={deleteModalShow}
                handleClose={() => setDeleteModalShow(false)}
                handleDeleteButton={handleDeleteButton}
                checkedArray={checkedArray}
            />
        </Layout >
    )
}

export default Category
