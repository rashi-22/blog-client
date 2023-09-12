import React, {useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom";
import { handleLogoutUser } from "../actions/loginAction"
import AddIcon from '@mui/icons-material/Add';
import CreateBlog from './createBlog';

export const NavBar = () => {

    const dispatch = useDispatch()
    const navigateUrl = useNavigate()
    const user = useSelector((state) => state.loginReducer?.user)

    const [state, setState] = useState({
      createDialog: false
    })

   
    const { createDialog } = state;
    const handleLogOut = () => {
        localStorage.clear();
        dispatch(handleLogoutUser());
        const url = "/";
        navigateUrl("/")
    }
    const toggleCreateDialog = () => {
        setState((prevState) => ({
          ...prevState,
          createDialog: !prevState.createDialog
        }))
    }
  return (
    <>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Blogs
          </Typography>
          {user?.role === "admin" && <Button color="inherit" onClick={toggleCreateDialog} startIcon={<AddIcon />}>
            Create Blog
          </Button>}
          <Button color="inherit" onClick={handleLogOut}>Logout</Button>
        </Toolbar>
      </AppBar>
    </Box>
    <CreateBlog open={createDialog} toggleCreateDialog={toggleCreateDialog} setState={setState}/>
    </>
  );
}

export default NavBar
