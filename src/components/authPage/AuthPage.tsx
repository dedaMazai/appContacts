import React from 'react';
import { useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';

import {useAuth} from '../../hooks/auth.hook';

interface State {
  login: string;
  password: string;
  showPassword: boolean;
}
type Res = { login: string, password: string }[]

const AuthPage: React.FC = () => {
  const { login } = useAuth();
  const dispatch = useDispatch()
  const [values, setValues] = React.useState<State>({
      login: '',
      password: '',
      showPassword: false,
    });

  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const addError = () => {
    dispatch({type:"ON_ERROR"})
  }
  const onErr = (e: React.ErrorInfo) => {
    addError();
    console.log("Ошибка \n" + e);
  }

  const requestSearch = async (): Promise<Res> => {
      const res = await fetch('/users');

      if (!res.ok) {
        throw new Error(`Could not fetch /users` +
          `, received ${res.status}`);
      }

      return await res.json();
    }
  const authEnter = (cont: Res) => {
    let user = cont.filter( (data: {login: string, password: string}) =>
      data.login === values.login && data.password === values.password );
    if( user ){
      login("true")
    }
  }
  const loginHand = () => {
    requestSearch()
    .then(authEnter)
    .catch(onErr);
  }

  return (
    <Box
      alignItems="center"
      justifyContent="center"
      sx={{
        boxShadow: 5,
        width: '25em',
        pb: 3,
        pt: 1,
        px: 5,
        my: 20,
        mx: 'auto',
        borderRadius: 4,
        textAlign: 'center',
        backgroundColor: 'common.white',
      }}
    >
      <Typography variant="h5" sx={{ py: 0.5}} >
        Авторизация
      </Typography>
      <Divider variant="middle" sx={{ textAlign: 'center', my: 1 }}/>
      <FormControl sx={{ m: 1, width: 1 }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-login">Login</InputLabel>
        <OutlinedInput
          id="outlined-adornment-login"
          type="text"
          value={values.login}
          onChange={handleChange('login')}
          label="Login"
        />
      </FormControl>
      <FormControl sx={{ m: 1, width: 1 }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={values.showPassword ? 'text' : 'password'}
          value={values.password}
          onChange={handleChange('password')}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                { values.showPassword ? <VisibilityOff /> : <Visibility /> }
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
      </FormControl>
      <Button variant="contained" onClick={loginHand}>Войти</Button>
    </Box>
  );
}

export default AuthPage;
