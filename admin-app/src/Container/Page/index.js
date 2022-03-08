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
    const [type, setType] = useState('');
    const [banners, setBanners] = useState([]);
    const [products, setProducts] = useState([])


    useEffect(() => {
        setCategories(linearCategories(category.categories));
    }, [category])

    const handleBannerImages = (e) => {
        setBanners([...banners, e.target.files[0]])
    }
    const handleProductImages = (e) => {
        setProducts([...products, e.target.files[0]])
    }

    const onCategoryChange = (e) => {
        const category = category.categories.find(category =>category._id === e.target.value); 
        setCategoryId(e.target.value);
        setType(category.type);
    }

    const submitPageForm=(e) => {
        e.preventDefault();
        if('title' === ''){
            alert("Title is requires");
            return;
        }

        const form = new FormData();
        form.append('title',title);
        form.append('description',description);
        form.append('category', categoryId);
        form.append('type', type);
        banners.forEach((banner, index)=>{
            form.append('banners', banner);
        });
        products.forEach((product, index)=>{
            form.append('products', product);
        })
        
        console.log({title, description, type, banners, products});
        setCreateModalShow(false);
    }


    const renderCreatePageModal = () => {
        return (
            <ModalComponent
                show={createModalshow}
                modalTitle={'Create New Page'}
                handleClose={() => setCreateModalShow(false)}
                handleAddButton={submitPageForm}
            >
                <Container>
                    <Row>
                        <Col>
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