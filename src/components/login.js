import React, {useState, useEffect} from "react"
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
// import Link from "@mui/material/Link";
// import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { handlLogin } from "../actions/loginAction"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom";

const Login = () => {

    const dispatch = useDispatch();
    const navigateUrl = useNavigate();
    const user = useSelector((state) => state.loginReducer?.user)
    console.log("user : ", user)
    useEffect(() => {   
        let url = "";
        url = url.concat("/", "blogs")
        user && navigateUrl(url)
    },[user])
    const [state, SetState] = useState({
        email: "",
        password: ""
    })

    const { email, password } = state;
    const handleSubmit = async(event) => {
        event.preventDefault();
        const data = {
            email,
            password
            }
        await dispatch(handlLogin(data));
    };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{  
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange={(e) => SetState({
                ...state,
                email: e.target.value
            })}
            value={email || ""}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange={(e)=> SetState({...state, password: e.target.value})}
            value={password || ""}
            autoComplete="current-password"
          />
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          {/* <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid> */}
        </form>
      </Box>
    </Container>
  );
}

export default Login;