import React, { useEffect } from 'react';
import { getAllCategory } from '../../actions';
import { useSelector, useDispatch } from 'react-redux';
import './style.css'


function MenuHeader() {

    const category = useSelector(state => state.category);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllCategory());
    }, [])

    const renderCategories = (categories) => {
        let mycategories = [];
        for (let category of categories) {
            mycategories.push(
                <li key={category.name} className='' >
                    {
                        category.parentId ?
                            <a className="text-[12px] m-0 p-0" href={category.slug}>{category.name}</a>
                            : 
                            // <span ><img src={category.categoryImage}/>{category.name}</span>
                            <div className="group border-none cursor-pointer p-[12px_8px] m-[0_25px]">
                                <div className="mb-[4px]">
                                    <div className="h-[64px] w-[64px] relative m-[0_auto]">
                                        <img className="absolute m-[auto] max-w-full max-h-full" src={category.categoryImage}/>
                                    </div>
                                </div>
                                <div className="font-sans relative inline-block">
                                    <div>
                                        <div className="text-[14px] font-medium group-hover:text-[#2874f0]">
                                            {category.name}
                                        </div>
                                    </div>
                                </div>
                            </div>
                    }
                    {category.children.length > 0 ? (<ul>{renderCategories(category.children)}</ul>) : null}
                </li>
            )

        }
        return mycategories
    }

    return (
        <div className="menuHeader w-1/1 h-[112px] relative bg-white ">
            <div className="flex w-1/1 left-0 justify-center shadow-[0_2px_2px_-2px_#333]">
            <ul className="flex w-1/1 justify-between flex-row max-w-[1280px]">
                {category.categories.length > 0 ?
                    renderCategories(category.categories)
                    : null
                }
            </ul>
            </div>
        </div>
    )
}

export default MenuHeader
