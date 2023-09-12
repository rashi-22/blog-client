// import axiosInstance from "../axios/axios"
import axiosInstance from "../axios/axios"
  
export const GET_BLOG_LIST = "GET_BLOG_LIST"
export const ADD_LIKE = "ADD_LIKE"
export const ADD_BLOG = "ADD_BLOG"
export const ADD_COMMENT = "ADD_COMMENT"
export const DELETE_BLOG = "DELETE_BLOG"
export const UPDATE_BLOG = "UPDATE_BLOG"

export const fetchBlogs = (isFirst = true) => {
    return async(dispatch, getState) => {
        let pageNumber = getState().blogReducer.pageNumber;
        pageNumber = !isFirst ? pageNumber + 1 : pageNumber;
        const limit = getState().blogReducer.limit;
        const offset = pageNumber * limit;
        try{ 
            const blogs = await axiosInstance({
                method: "post",
                url: "http://localhost:3001/fetchBlogs",
                data: {limit:2, offset}
            })
            if(blogs?.data){
                dispatch({
                    type: GET_BLOG_LIST,
                    payload: {blogs: blogs?.data?.data || [], pageNumber,totalBlogs: blogs?.data?.totalBlogs}
                })
            }
        }catch(ex){
            console.log("fetch blogs : ", ex.message)
            return ex.message
        }
    }
}

export const createBlog = (title, description, file) => {
    return async(dispatch, getState) => {
        const currentUser = getState().loginReducer?.user
        try{
            const res = await axiosInstance({
                method: "post",
                url: "http://localhost:3001/upsertBlog",
                data: {user_id: currentUser?.id, title, description, content: file} 
            })
            if(res?.data){
                dispatch({
                    type: ADD_BLOG,
                    payload: res?.data
                })   
            }
        }catch(ex){
            console.log("craete Blog : ", ex.message)
            return ex.message
        }
    }
}

export const deleteBlog = (blog_id) => {
    return async(dispatch, getState) => {
        try{
            const res = await axiosInstance({
                method: "post",
                url: "http://localhost:3001/deleteBlog",
                data: {blog_id}
            })
            if(res?.data){
                dispatch({
                    type: DELETE_BLOG,
                    payload: res?.data
                })
            }
        }catch(ex){
            console.log("delete Blog - ", ex?.message);
            return ex?.message
        }
    }
}  
export const addLikes = (blog_id) => {
    return async(dispatch, getState) => {
        try{
            const currentUser = getState()?.loginReducer?.user
            const res = await axiosInstance({
                method: "post",
                url: "http://localhost:3001/addLikes",
                data: {user_id: currentUser?.id, blog_id}
            })
            if(res?.data){
                dispatch({
                    type: ADD_LIKE,
                    payload: {blog_id: res?.data?.blog_id, user_id: res?.data?.user_id}
                })
            }    
        }catch(ex){
            console.log("add likes : ", ex?.message)
            return ex.message
        }
        
    }
}

export const addComment = (blog_id, comment) => {
    return async(dispatch, getState) => {
        const currentUser = getState()?.loginReducer?.user;
        try{
            const res = await axiosInstance({
                method: "post",
                url: "http://localhost:3001/addBlogComments",
                data: {blog_id, comment, user_id: currentUser?.id}
            })
            if(res?.data){
                dispatch({
                    type: ADD_COMMENT,
                    payload: res?.data
                })
            }
        }catch(ex){
            console.log("addComment : ", ex?.message)
            return ex.message
        }
    }
}

export const updateBlog = (blog_id, title, description) => {
    return async(dispatch, getState) => {
        const currentUser = getState().loginReducer?.user;
        try{
            const res = await axiosInstance({
                method: "post",
                url: "http://localhost:3001/upsertBlog",
                data: {blog_id, title, description, user_id: currentUser?.id}
            })
            if(res?.data){
                dispatch({
                    type: UPDATE_BLOG,
                    payload: res?.data
                })
            }
        }catch(ex){
            console.log("Edit blog- ", ex?.message)
            return ex.message
        }
    }
}