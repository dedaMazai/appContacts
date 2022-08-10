import * as React from 'react';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12em',
      '&:focus': {
        width: '20em',
      },
    },
  },
}));
interface Contact {
  name: string,
  tel: string,
  info: string,
  id: number,
}

export default function SearchAppBar() {
  const dispatch = useDispatch()
  const {content, request, idEdit} = useTypedSelector(state => state.cards)
  const [req, setReq] = React.useState<string>("");

  const handleWrite = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReq(event.target.value);
    if(content.length > 0){
      let arrContent: Contact[] = []
      content.forEach((a: Contact) =>
        { if ( a.name.includes(`${event.target.value}`) ) {arrContent.push(a)} })
      dispatch({type:"SET_REQUEST", payload: arrContent})
    }
  };

  React.useEffect(() => {
    if (req === '' && request.length > 0) {
      dispatch({type:"SET_REQUEST", payload: []})
    } else if (req && request.length > 0) {
      let arrContent: Contact[] = []
      content.forEach((a: Contact) => {if ( a.name.includes(`${req}`) ){ arrContent.push(a) }})
      dispatch({type:"SET_REQUEST", payload: arrContent})
    }
  },[req, content.length, idEdit])

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Контакты
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              onChange={handleWrite}
              value={req}
            />
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
