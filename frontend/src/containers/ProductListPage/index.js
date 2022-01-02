import React, { useEffect } from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getProductsBySlug } from '../../actions';
import Layout from '../../components/Layout';
import { generatePublicUrl } from '../../urlConfig';


const ProductListPage = (props) => {

    const dispatch = useDispatch();
    const product = useSelector(state => state.product);
    const [priceRange, setPriceRange] = useState({
        under5k: 5000,
        under10k: 10000,
        under15k:15000,
        under20k:20000
    })
    console.log(product);
    useEffect(() => {
        // console.log("Props", props);
        const { match } = props;
        dispatch(getProductsBySlug(match.params.slug));
    }, [])


    return (
        <Layout>

            {
                Object.keys(product.productsByPrice).map((key, index) => {
                    return (
                        <div className="w-1/1 mx-2.5 my-2.5 border border-slate-300 shadow-md">
                            <div >
                                <div className="flex justify-between p-4 border-b border-[#cecece]">
                                    <div>{props.match.params.slug} Mobile under {priceRange[key]} </div>
                                    <button>View All</button>
                                </div>
                                <div className="flex">
                                    {
                                        product.productsByPrice[key].map(product =>
                                            <div className=" m-2 w-48 h-76 ">
                                                <div className="w-20 overflow-hidden text-center m-[15px_auto] ">
                                                    <img className="max-w-full max-h-full object-contain" src={generatePublicUrl(product.productPictures[0].img)} alt="" />
                                                </div>
                                                <div className="text-center">
                                                    <div className="mx-0.5">{product.name}</div>
                                                    <div className="mx-0.5">
                                                        <span>4.3</span>&nbsp;
                                                        <span>3352</span>
                                                    </div>
                                                    <div className="mx-0.5 font-bold text-base my-1">{product.price}</div>
                                                </div>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </div>

                    )
                })
            }

        </Layout>
    )
}

export default ProductListPage
