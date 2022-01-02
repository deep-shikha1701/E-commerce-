import React, { useState } from 'react';
import { Row, Col, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../Components/Layouts'
import Input from '../../Components/UI/input';
import { addProduct } from '../../actions';
import ModalComponent from '../../Components/UI/Modal';
import './style.css';
import {generatePublicUrl} from '../../urlConfig';



const Products = (props) => {

    const [modalShow, setModalShow] = useState(false);
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [productPictures, setProductPictures] = useState([]);
    const category = useSelector(state => state.category)
    const dispatch = useDispatch();
    const product = useSelector(state => state.products);

    const [productDetailModalShow, setProductDetailModalShow] = useState(false);
    const [productDetails, setProductDetails] = useState(null)

    const handleAddProduct = (e) => {
        const form = new FormData();
        form.append('name', name);
        form.append('quantity', quantity);
        form.append('price', price);
        form.append('description', description);
        form.append('category', categoryId);

        for (let pic of productPictures) {
            form.append('productPictures', pic);
        }

        dispatch(addProduct(form));

        setModalShow(false)
    }

    const createCategoryList = (categories, options = []) => {
        if (categories) {
            for (let category of categories) {
                options.push({ value: category._id, name: category.name });
                if (category.children.length > 0) {
                    createCategoryList(category.children, options);
                }
            }
        }

        return options;
    }

    const handleProductPictures = (e) => {

        setProductPictures([
            ...productPictures,
            e.target.files[0]
        ]);
    }

    const handleAddProductCloseButton = () => {
        setModalShow(false);
    }

    const handleProductDeatilCloseButton = () => {
        setProductDetailModalShow(false);
    }

    const showProductDetailsModal = (product) => {
        setProductDetails(product)
        setProductDetailModalShow(true);
        console.log(product);
    }

    const renderProducts = () => {
        return (
            <Table style={{ fontSize: 12 }} responsive="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Category</th>
                        <th>Details</th>
                    </tr>
                </thead>
                <tbody>
                    {product.products.length > 0
                        ? product.products.map((product) => (
                            <tr key={product._id}>
                                <td>#</td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.quantity}</td>
                                { product.category ?
                                    <td>{product.category.name}</td>
                                    : <td>--</td>
                                }
                                    
                                <td>
                                    <button onClick={() => showProductDetailsModal(product)}>
                                        info
                                    </button>
                                    {/* <button
                          onClick={() => {
                            const payload = {
                              productId: product._id,
                            };
                            dispatch(deleteProductById(payload));
                          }}
                        >
                          del
                        </button> */}
                                </td>
                            </tr>
                        ))
                        : null}
                </tbody>
            </Table>
        );
    };

    const renderAddProductModal = () => {
        return (
            <ModalComponent
                show={modalShow}
                modalTitle="Add Product"
                handleClose={handleAddProductCloseButton}
                handleAddButton={handleAddProduct}

            >
                <Input
                    label="Name"
                    value={name}
                    placeholder={`Product Name`}
                    onChange={(e) => setName(e.target.value)}
                />
                <Input
                    label="Price"
                    value={price}
                    placeholder={`Price`}
                    onChange={(e) => setPrice(e.target.value)}
                />
                <Input
                    label="Quantity"
                    value={quantity}
                    type="number"
                    min="1"
                    placeholder="0"
                    onChange={(e) => setQuantity(e.target.value)}
                />
                <label>Description</label><br></br>
                <textarea
                    cols="60"
                    rows="5"
                    label="Description"
                    value={description}
                    placeholder="Description"
                    onChange={(e) => setDescription(e.target.value)}
                /><br></br>
                <label>Category</label>
                <select
                    label="Category Name"
                    className="form-control" value={categoryId}
                    onChange={(e) => { setCategoryId(e.target.value) }}>
                    <option>Select Category</option>
                    {
                        createCategoryList(category.categories).map(option =>
                            <option key={option.value} value={option.value}>{option.name}</option>)
                    }
                </select>
                {
                    productPictures.length > 0 ?
                        productPictures.map((pic, index) => <div key={index}>{JSON.stringify(pic.name)}</div>) : null
                }

                <input
                    name="productPictures"
                    onChange={handleProductPictures}
                    type="file"
                />
            </ModalComponent>
        )
    }

    const renderProductDetailModal = () => {

        if (!productDetails)
            return null;

        return (
            <ModalComponent
                show={productDetailModalShow}
                handleClose={handleProductDeatilCloseButton}
                modalTitle={`Product Details`}
                size="lg"
            >
                <Row>
                    <Col md="6">
                        <label className='key'>Name</label>
                        <p className="value">{productDetails.name}</p>
                    </Col>
                    <Col md="6">
                        <label className='key'>Price</label>
                        <p className="value">{productDetails.price}</p>
                    </Col>
                </Row>
                <Row>
                    <Col md="6">
                        <label className='key'>Category</label>
                        <p className="value">{productDetails.category.name}</p>
                    </Col>
                    <Col md="6">
                        <label className='key'>Quantity</label>
                        <p className="value">{productDetails.quantity}</p>
                    </Col>
                </Row>
                <Row>
                    <Col md="12">
                        <label className='key'>Description</label>
                        <p className="value">{productDetails.description}</p>
                    </Col>
                </Row>
                <Row>
                    <Col md="12" >
                        <label className='key'>Product Images</label>
                        <div style={{ display: 'flex' }}>
                            {productDetails.productPictures.map(picture =>
                                <div className="productImageContainer">
                                    <img src={generatePublicUrl(picture.img)} />
                                </div>
                            )}
                        </div>
                    </Col>
                </Row>
            </ModalComponent>
        )
    }


    return (
        <Layout sidebar>
            <Row>
                <Col md={12}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <h3>Products</h3>
                        <button onClick={() => setModalShow(true)}>Add</button>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    {renderProducts()}
                </Col>
            </Row>
            {renderAddProductModal()}
            {renderProductDetailModal()}
        </Layout>
    )
}


export default Products;