import React, { useState } from "react"
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import {Button} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from "react-redux";
import {createBlog} from "../actions/blogAction"
import {storage} from "../firebaseConfig/config"
import { ref, getDownloadURL, uploadBytes } from "firebase/storage"
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import CardMedia from '@mui/material/CardMedia';

const CreateBlog = (props) => {

    const dispatch = useDispatch();
    const { open, toggleCreateDialog, setState } = props

    const [blog, setBlog] = useState({
        file:null,
        title:"",
        description: "",
        loading: false
    })

    const { file, title, description, loading } = blog
    const handleCancel = () => {
        setState((prev)=> ({
            ...prev,
            createDialog: false
        }))
        setBlog({
            file: null,
            title: "",
            description: ""
        })
    }

    const handleChange = (event,name) => {
        event.persist();
        setBlog((prev) => ({
            ...prev,
            [name]: event.target.value
        }))
    }

    const setUrl = (downloadURL) => {
        setBlog((prev) => ({
            ...prev,
            loading: false,
            file: downloadURL
        }))
    }
    const handleFileUpload = async(event) => {
        event.persist();
        setBlog((prev) => ({
            ...prev,
            loading: true
        }))
        const file = event.target.files[0]
        const fileName = "file-" + file?.type + Date.now();
        let url = "";
        const reference = ref(storage, fileName)
        uploadBytes(reference, file)
            .then(snapshot => {
            return getDownloadURL(snapshot.ref)
            })
            .then(downloadURL => {
                url = downloadURL
                setUrl(downloadURL)
            })

    }

    const handlImgCancelClick = () => {
        setBlog((prev) => ({
            ...prev,
            file: null
        }))
    }

    const handleCreateClick = () => {
        dispatch(createBlog(blog?.title, blog?.description,blog?.file))
        setState((prev)=> ({
            ...prev,
            createDialog: false
        }))
        setBlog({
            file:null,
            title:"",
            description: "",
            loading: false
        })
    }

    return (
        <Dialog open={open} PaperProps={{
            sx: {
              width: "100%",
              maxHeight: "100%"
            }
          }}>
            <DialogTitle>Create New Blog</DialogTitle>
            <DialogContent>
                <div>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="title"
                        label="Title"
                        fullWidth
                        variant="outlined"
                        value={title}
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
                    value={description}
                    onChange={(e) => {handleChange(e,"description")}}
                 />
                 </div>
                 {loading ?
                  <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                  </Box>
                  : file && <div className="container my-8 relative inline h-full w-full">
                        {file?.includes("image") ? 
                            <img src={file} height="50%" width="50%" className="mt-8"></img>
                            : file?.includes("video") ?
                                <CardMedia component="iframe" 
                                    src={file}
                                    className="my-8"
                                    sx={{
                                        width:'30vw',
                                        height: '50vh'
                                    }}
                                />
                                : <></>
                        }
                        {/* <CardMedia component="iframe" 
                            src={file}
                            className="my-8"
                            sx={{
                                width:'30vw',
                                height: '50vh'
                            }}
                        /> */}
                        <CloseIcon className="absolute top-0 right-0 z-1 w-12 h-12 cursor-pointer" onClick={handlImgCancelClick}/>
                    </div>
                //   : file && <div className="container my-8 relative inline h-full w-full">
                //         <iframe height={"100%"} width={"100%"} src={file} alt="Base64 Image" className="my-8 object-contain w-full"></iframe>
                //         <CloseIcon className="absolute top-0 right-0 z-1 w-12 h-12 cursor-pointer" onClick={handlImgCancelClick}/>
                //     </div>
                }
                 {(!file && !loading) && <div className="mt-8">
                    <Button variant="contained" component="label">
                        Upload
                        <input hidden accept="*" multiple type="file"  onChange={e => {handleFileUpload(e)}}/>
                    </Button>
                 </div>}
            </DialogContent>
            <DialogActions>
                <Button className="mr-8" variant="contained" onClicolor="primary" onClick={handleCreateClick}>Create</Button>
                <Button variant="contained" color="primary" onClick={handleCancel}>Cancel</Button>
            </DialogActions>
        </Dialog>
    )
}

export default CreateBlog;