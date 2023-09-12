import React, {useEffect, useState} from "react"
import { Typography, Box } from "@mui/material"
import InfiniteScroll from 'react-infinite-scroll-component';
import {fetchBlogs, addLikes, deleteBlog} from "../actions/blogAction"
import { useSelector, useDispatch } from "react-redux"
import CardMedia from '@mui/material/CardMedia';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CommentIcon from '@mui/icons-material/Comment';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Comments from "./comments";
import EditBlog from "./editBlog"
const BlogDetail = () => {

    const dispatch = useDispatch()
    const blogsData = useSelector((state) => state.blogReducer)
    const user = useSelector((state) => state.loginReducer?.user)
    const blogList = useSelector((state) => state.blogReducer?.blogList)

    const [open, setOpen] = useState(false)
    const [editDialog, setEditDialog] = useState(false)
    const [blogData, setBlogData] = useState(null)
    const [popState, setPopState] = useState({
        open: false,
        anchorEl: null,
        blog_id:""
    });
    const fetchData = async() => {
        await dispatch(fetchBlogs())
    }
    useEffect(()=> {
        !blogsData?.blogList && fetchData()
    },[])

    const loadMoreData = () => {
        dispatch(fetchBlogs(false))
    }

    const handleLikeClick = async(blog_id) => {
       await dispatch(addLikes(blog_id))
    }

    const getColor = (likes) => {
       const like = likes?.find((like) => like?.user_id === user?.id)
       return like ? true : false;
    }

    const toggleComments = () => {
        setOpen(!open)
    }

    const togglePopover = (event, blog_id) => {
        setPopState({
            open: !popState?.open,
            anchorEl: event.currentTarget,
            blog_id: blog_id
        })
    }
    const handleMenuClose = () => {
        setPopState({
            open: false,
            anchorEl: null
        })
    }

    const handleEditBlog = () => {
        const data = blogList.find((blog) => blog?.id === popState.blog_id)
        setEditDialog(true)
        setBlogData(data)
        setPopState({
            open: false,
            anchorEl: null,
            blog_id: ""
        })
    }

    const handleDeleteBlog = async() => {
        await dispatch(deleteBlog(popState.blog_id))
        setPopState({
            open: false,
            anchorEl: null,
            blog_id: ""
        })
    }
    return (
        <div id="scrollableDiv"
        style={{
            height: 500,
            overflow: 'auto',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
              <InfiniteScroll
                dataLength={2}
                next={loadMoreData}
                style={{ flexDirection: 'column' }} //To put endMessage and loader to the top.
                hasMore={blogsData?.blogList?.length < blogsData?.totalBlogs}
                loader={<h4>Loading...</h4>}
                scrollableTarget="scrollableDiv"
              >
                {
                   (blogsData?.blogList &&  blogsData?.blogList?.length) && blogsData?.blogList?.map((blog, index) => (
                    <div className="flex">
                        <Box
                            sx={{
                                p: 6,
                                border: 1,
                                borderColor: "grey.200",
                                borderRadius: 1,
                                boxShadow: 1,
                            }}
                            >
                            <div className="flex flex-row w-full">
                                <div>
                                    <Typography
                                        variant="h4"
                                        component="h2"
                                        mb={2}
                                        className="justify-start"
                                        sx={{ fontWeight: "bold" }}
                                    >
                                        {blog.title}
                                    </Typography>
                                </div> 
                               {user?.role === "admin" && <div>
                                    <MoreVertIcon onClick={(event) => {togglePopover(event, blog?.id)}}/>
                                </div>}
                            </div>
                            <div className="flex">
                            <Typography variant="h6" color="text.secondary" mb={5} className="mt-16">
                                {blog.description}
                            </Typography>
                            </div>
                            {blog?.content?.includes("image") 
                             ? <img src={blog?.content} height={"200px"} width={"400px"}></img>
                             : blog?.content?.includes("video")
                              ?  <CardMedia component="iframe" 
                                    src={blog?.content}
                                    sx={{
                                        width:'40vw',
                                        height: '50vh',
                                    }}
                                /> : <></>
                            }
                           
                            <div className="mt-4 flex flex-row">
                                <div className="mr-8">
                                    <div className="flex flex-row cursor-pointer">
                                        {getColor(blog?.likes) ? <ThumbUpAltIcon/>
                                        : <ThumbUpOffAltIcon onClick={() => {handleLikeClick(blog?.id)}}/>
                                        }
                                        {blog?.likes ? <Typography>{blog?.likes?.length}</Typography> : ""}
                                    </div>
                                    <Typography className="ml-2 mr-2">like</Typography>
                                </div>
                                <div className="mr-8">
                                    <div className="flex flex-row cursor-pointer">
                                        <CommentIcon onClick={toggleComments}/>
                                    </div>
                                <Typography className="mr-2 ml-2">Comment</Typography>
                                </div>
                            </div>
                            <div>
                                {open && <Comments blog={blog}/>}
                            </div>
                        </Box>
                        <Menu
                            id="basic-menu"
                            anchorEl={popState.anchorEl}
                            open={popState.open}
                            onClose={handleMenuClose}
                            MenuListProps={{
                            'aria-labelledby': 'basic-button',
                            }}
                        >
                            <MenuItem onClick={handleEditBlog}>Edit</MenuItem>
                            <MenuItem onClick={handleDeleteBlog}>Delete</MenuItem>
                        </Menu>
                        <EditBlog open={editDialog} blog={blogData} setEditDialog={setEditDialog}/>
                        </div>
                    ))
                }
              </InfiniteScroll>
        </div>
    )
}
export default BlogDetail