import * as Actions from "../actions/blogAction"
const initialState = {
    blogList: null,
    totalBlogs: 0,
    pageNumber:0,
    limit:2
}

const blogReducer = (state = initialState, action) => {
    switch(action.type) {
        case Actions.GET_BLOG_LIST: {
            const data = action.payload;
            let newList = [];
            if(state?.blogList?.length){
                newList = [...state?.blogList, ...data?.blogs]
            }else{
                newList = [...data?.blogs]
            }
            return{
                ...state,
                blogList: [...newList],
                totalBlogs: action?.payload?.totalBlogs,
                pageNumber: data?.pageNumber
            }
        }
        case Actions.ADD_LIKE: {
            let blogs = state.blogList ? Array.from(state?.blogList) : [];
            const index = blogs?.findIndex((blog) => blog?.id === action?.payload?.blog_id)
            if(index !== -1){
                const likes = blogs[index]?.likes;
                const newLike = likes?.length ? [...likes, action.payload] : [action.payload]
                blogs[index] = {...blogs[index], likes: newLike}
                console.log("blogs from reducer ", blogs)
            }
            return{
                ...state,
                blogList: [...blogs]
            }
        }
        case Actions.ADD_BLOG: {
            let blogs = state?.blogList ? Array.from(state.blogList) : [];
            blogs = blogs?.length ? [action?.payload, ...blogs]  : [action?.payload]
            return{
                ...state,
                blogList: blogs
            }
        }
        case Actions.DELETE_BLOG: {
            let blogs = state.blogList ? Array.from(state?.blogList) : []
            if(blogs?.length){
               const index =  blogs.findIndex((blog) => blog?.id === action?.payload?.id)
               if(index !== -1){
                    blogs.splice(index,1)
               }
            }
            return {
                ...state,
                blogList: [...blogs]
            }
        }
        case Actions.UPDATE_BLOG: {
            let blogs = state.blogList ? Array.from(state.blogList) : []
            if(blogs?.length){
                const index = blogs.findIndex((blog) => blog?.id === action?.payload?._id);
                if(index !== -1){
                    blogs[index] = {...blogs[index], title: action.payload.title, description: action.payload.description}
                }
                console.log("blog[index] : ", blogs[index])
            }
            return{
                ...state,
                blogList: [...blogs]
            }
        }
        case Actions.ADD_COMMENT: {
            let blogs = state?.blogList ? Array.from(state.blogList) : [];
            console.log("Blogs : ", blogs)
            const index = blogs?.findIndex((blog) => blog?.id === action?.payload?.blog_id)
            if(index !== -1){
                const comments = blogs[index]?.comments;
                const newComment = comments?.length ? [action.payload, ...comments] : [action.payload]
                blogs[index] = {...blogs[index], comments: newComment}
            }
            return {
                ...state,
                blogList: [...blogs]
            }
        }
        default: {
            return state
        }
    }
}

export default blogReducer