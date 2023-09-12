import React, { useState, useEffect } from "react"
import { updateBlog } from "../actions/blogAction"
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useDispatch } from "react-redux";

const EditBlog = (props) => {

    const { blog , open, setEditDialog } = props;
    console.log("EditBlog : ", blog)
    const [editBlog, setEditBlog] = useState({
        title:"",
        description: ""
    })

    useEffect(() => {
       setEditBlog({
        title: blog?.title,
        description: blog?.description
       })
    },[blog])
    const dispatch = useDispatch()
   

    const { title, description } = editBlog
    const handleChange = (event,name) => {
        event.persist()
        setEditBlog({
            ...editBlog,
            [name]: event.target.value
        })
    }
    const handleUpdateClick = async() => {
        await dispatch(updateBlog(blog?.id, title, description))
        setEditDialog(false)
    }

    const handleCancel = () => {
        setEditDialog(false)
    }
    return (
        <Dialog open={open} PaperProps={{
            sx: {
              width: "100%",
              maxHeight: "100%"
            }
          }}>
            <DialogTitle>Edit Blog</DialogTitle>
            <DialogContent>
                <div>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="title"
                        label="Title"
                        fullWidth
                        variant="outlined"
                        value={title || ""}
                        onChange={(e) => {handleChange(e,"title")}}
                    />
                </div>
                <div className="mt-4">
                 <TextField
                    id="description"
                    label="Description"
                    placeholder="Description"
                    fullWidth
                    multiline
                    value={description || ""}
                    onChange={(e) => {handleChange(e,"description")}}
                 />
                </div>
            </DialogContent>
            <DialogActions>
                <Button className="mr-8" variant="contained" onClicolor="primary" onClick={handleUpdateClick}>Update</Button>
                <Button variant="contained" color="primary" onClick={handleCancel}>Cancel</Button>
            </DialogActions>
        </Dialog>
    )
}

export default EditBlog