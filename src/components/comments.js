import React, { useState } from "react"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import SendIcon from '@mui/icons-material/Send';
import { useDispatch } from "react-redux";
import { addComment } from "../actions/blogAction"

const Comments = (props) => {

    const { blog } = props
    const dispatch = useDispatch()
    const [comment, setComment] = useState("")

    const handleAddComment = async(blog_id) => {
        comment && await dispatch(addComment(blog_id, comment)) 
        setComment("")
    }

    console.log("blog?.comments : ", blog?.comments)
    console.log("!!blog?.comments?.length",!!blog?.comments?.length)

    return (
        <>
            <div className="flex flex-row">
                <TextField
                    margin="dense"
                    variant="outlined"
                    type="text"
                    width={3/4}
                    value={comment || ""}
                    onChange={(event) => {setComment(event?.target?.value)}}
                    placeholder="Write Your comment Here"
                />
                <SendIcon className="items-end justify-end mt-8 ml-2 cursor-pointer" onClick={() => {handleAddComment(blog?.id)}}/>
            </div>
            <div className="flex mt-4">
            <Typography className="font-medium">All Comments</Typography>
            </div>
            <div className="mt-2">
                {
                !!blog?.comments?.length && blog?.comments?.map((comment) => (
                    <div className=" flex mt-2 border-solid border-2 border-inhetit">
                        <Typography>{comment?.comment}</Typography>
                    </div>
                ))
                }
                </div>
        </>
    )
}

export default Comments