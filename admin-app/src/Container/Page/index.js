import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { Row, Col, Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Layout from '../../Components/Layouts'
import Input from '../../Components/UI/input';
import ModalComponent from '../../Components/UI/Modal';
import linearCategories from '../../helpers/linearCategories';

const Page = () => {

    const [createModalshow, setCreateModalShow] = useState(false);
    const [title, setTitle] = useState('');
    const category = useSelector(state => state.category);
    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState('');
    const [description, setDescription] = useState('');
    const [banners, setBanners] = useState([]);
    const [products, setProducts] = useState([])


    useEffect(() => {
        setCategories(linearCategories(category.categories));
    }, [category])

    const handleBannerImages = (e) => {
        console.log(e)
    }
    const handleProductImages = (e) => {
        console.log(e)
    }

    const onCategoryChange = (e) => {
        setCategoryId(e.target.value);
    }


    const renderCreatePageModal = () => {
        return (
            <ModalComponent
                show={createModalshow}
                modalTitle={'Create New Page'}
                handleClose={() => setCreateModalShow(false)}
            >
                <Container>
                    <Row>
                        <Col>
                            {/* <select
                                className="form-control"
                                value={categoryId}
                                onChange={onCategoryChange}
                            >
                                <option value="">select category</option>
                                {
                                    categories.map(cat =>
                                        <option key={cat._id} value={cat._id}>{cat.name}</option>
                                    )
                                }
                            </select> */}
                            <Input
                                type="select"
                                value={categoryId}
                                onChange={onCategoryChange}
                                options={categories}
                                placeholder={'Select Category'}
                            />
                        </Col>
                    </Row>
                    <br></br>
                    <Row>
                        <Col>
                            <Input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder={'Page Title'}
                                className=""
                            />
                        </Col>
                    </Row>
                    <br></br>
                    <Row>
                        <Col>
                            <Input
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder={'Page Desc'}
                                className=""
                            />
                        </Col>
                    </Row>
                    <br></br>
                    {
                        banners.length > 0 ?
                            banners.map((banner, index) =>
                                <>
                                    <Row key={index}>
                                        <Col>{banner.name}</Col>
                                    </Row>
                                    <br></br>
                                </>
                            ) : null
                    }
                    <Row>
                        <Col>
                            <Input
                                className="form-control"
                                type="file"
                                name="banners"
                                onChange={handleBannerImages}
                            />
                        </Col>
                    </Row>
                    <br></br>
                    {
                        products.length > 0 ?
                            products.map((product, index) =>
                                <Row key={index}>
                                    <Col>{product.name}</Col>
                                </Row>
                            ) : null
                    }
                    <Row>
                        <Col>
                            <Input
                                className="form-control"
                                type="file"
                                name="products"
                                onChange={handleProductImages}
                            />
                        </Col>
                    </Row>
                </Container>
            </ModalComponent>

        )
    }


    return (
        <Layout sidebar>
            {renderCreatePageModal()}
            <button onClick={() => setCreateModalShow(true)}>Create Page</button>
        </Layout>
    )
}

export default Page;