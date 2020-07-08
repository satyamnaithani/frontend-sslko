import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { url } from '../globalVariables';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://satsolindia.com" target="_blank">
        Satvik Solutions
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [tokenNo, setTokenNo] = useState('');
  const [userName, setUserName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState('');
  console.log(tokenNo)
  console.log(userName)
  const handleSubmit = () => {
    setIsLoading(true);
    axios({
      method: 'post',
      url: url + '/user/login',
      config: { headers: { 'Content-Type': 'application/json' } },
      data: {
        email: email,
        password: password,
      }
    })
      .then((response) => {
        setTokenNo(response.data.token);
        setUserName(response.data.name);
        setIsLoading(false)
        setOpenSnackBar('authenticated')
      })
      .catch((error) => {
        setIsLoading(false)
        if (error.message === 'Request failed with status code 404') {

          setOpenSnackBar('email_not_exit')
        }
        else if (error.message === 'Request failed with status code 401') {

          setOpenSnackBar('incorrect_password')
        }
        else {

          alert('Error')
        }
      });
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value={rememberMe} color="primary" onChange={(e) => { setRememberMe(e.target.checked) }} checked={rememberMe} />}
            label="Remember me"
          />
          <Button
            //type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            className={classes.submit}
          >{
              isLoading ? <CircularProgress size='1.5rem' color='inherit' /> : 'Sign In'
            }

          </Button>
          <Grid container>
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
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
      <Snackbar open={openSnackBar==='authenticated'} autoHideDuration={3000} onClose={()=> setOpenSnackBar('')} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={()=> setOpenSnackBar('')} severity="success">
          Authenticated!
  </Alert>
      </Snackbar>
      <Snackbar open={openSnackBar==='email_not_exit'} autoHideDuration={3000} onClose={()=> setOpenSnackBar('')} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={()=> setOpenSnackBar('')} severity="error">
          Email Not Exit!
  </Alert>
      </Snackbar>
      <Snackbar open={openSnackBar==='incorrect_password'} autoHideDuration={3000} onClose={()=> setOpenSnackBar('')} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={()=> setOpenSnackBar('')} severity="error">
          Incorrect Password!
  </Alert>
      </Snackbar>
    </Container>
  );
}

