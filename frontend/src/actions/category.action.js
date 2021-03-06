import axios from '../helpers/axios';
import { categoryConstants } from './constants';


export const getAllCategory = () => {
    return async (dispatch) => {

        dispatch({type: categoryConstants.GET_ALL_CATEGORIES_REQUEST});
        const res = await axios.get(`category/getCategory`);
        console.log(res);
        if(res.status === 200){

            const {categoryList} = res.data;
            // console.log("categoriea are",categoryList);
            dispatch({ 
                type: categoryConstants.GET_ALL_CATEGORIES_SUCCESS,
                payload: {category: categoryList}
            })
        }else{
            dispatch({
                type: categoryConstants.GET_ALL_CATEGORY_FAILURE,
                payload:{error: res.data.error}})
        }
    }
}


export const addCategory = (form) => {
    return async dispatch =>{
        dispatch({type: categoryConstants.ADD_NEW_CATEGORY_REQUEST});
        const res = await axios.post(`category/create`, form)
        if(res.status === 201){
            dispatch({type: categoryConstants.ADD_NEW_CATEGORY_SUCCESS,
            payload:{category: res.data.cat } 
            });
        } else {
            dispatch({type: categoryConstants.ADD_NEW_CATEGORY_FAILURE, 
                payload: res.data.error
            });
    
        }
        console.log(res);
    }
}