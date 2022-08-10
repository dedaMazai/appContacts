import * as React from 'react';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

interface Props {
  close?: () => void;
  data?: {
    name: string,
    tel: string,
    info: string,
    id: number
  }
}
interface Value {
  name: string,
  tel: string,
  info: string,
}
interface Contact {
  name: string,
  tel: string,
  info: string,
  id: number,
}

const  EditBlock: React.FC<Props> = (props: Props) => {
  const {data} = props
  const [value, setValue] = React.useState<Value>({
    name: data ? data.name : "",
    tel: data ? data.tel : "",
    info: data ? data.info : ""
  });
  const dispatch = useDispatch()
  const {content} = useTypedSelector(state => state.cards)

  const addContact = () => {
    if(value.name && value.tel){
      let arrContent = [...content]
      let idNew = content.length > 0 ? arrContent.sort( (a: Contact, b: Contact) => b.id - a.id )[0].id : 0
      const newContact = {...value, id: ++idNew}
      dispatch({type:"SET_CONTENT", payload: [...content, newContact]})
      setValue({name:'', tel:'', info:''});
      if(props.close !== undefined){props.close()}
    }
  }

  const editContact = () => {
    if(value.name && value.tel && data){
      const edit = {...value, id: data.id}
      const editContacts = content.map((a: Contact) => a.id === data.id ? edit : a)
      dispatch({type:"SET_CONTENT", payload: editContacts})
      dispatch({type:"SET_ID_EDIT", payload: false})
      setValue({name:'', tel:'', info:''});
    }
  }

  const handleWrite = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue({...value, [event.target.id]: event.target.value});
  };

  const closeAddContact = () => {
    setValue({name:'', tel:'', info:''});
    if(props.close !== undefined){props.close()}
  }

  const closeEditContact = () => {
    setValue({name:'', tel:'', info:''});
    dispatch({type:"SET_ID_EDIT", payload: false})
  }

  return (
    <Grid container sx={{
      boxShadow: 5,
      width: '100%',
      my: 1,
      borderRadius: 1,
      backgroundColor: 'common.white',
    }}>
      <Grid item xs={6} sx={{pt: 3, pl: 3}}>
        <TextField
          id="name"
          label="Имя контакта"
          value={value.name}
          onChange={handleWrite}
          sx={{ width: '100%'}}
        />
      </Grid>
      <Grid item xs={6} sx={{pt: 3, px: 3}}>
        <TextField
          id="tel"
          label="Номер"
          value={value.tel}
          onChange={handleWrite}
          sx={{width: '100%'}}
        />
      </Grid>
      <Grid item xs={12} sx={{py: 3, px: 3}}>
        <TextField
          id="info"
          label="Информация"
          multiline
          maxRows={5}
          value={value.info}
          onChange={handleWrite}
          sx={{width: '100%'}}
        />
      </Grid>
      <Grid item sx={{px: 3, pb: 3, flexGrow: 1}}></Grid>
      <Grid item xs="auto" sx={{pb: 3}} >
        <Button variant="contained"  onClick={data ? editContact : addContact}>Сохранить</Button>
      </Grid>
      <Grid item xs="auto" sx={{px: 3, pb: 3}} >
        <Button variant="contained" color="error" onClick={data ? closeEditContact : closeAddContact}>Закрыть</Button>
      </Grid>
    </Grid>
  );
}

export default EditBlock;
