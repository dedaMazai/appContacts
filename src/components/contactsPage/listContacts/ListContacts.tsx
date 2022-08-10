import * as React from 'react';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditBlock from './editBlock';
import LineContact from './lineContact';

interface Props {
  name: string,
  tel: string,
  info: string,
  id: number
}

export default function ControlledAccordions () {
  const {content, request, idEdit} = useTypedSelector(state => state.cards)
  const [addBlock, setAddBlock] = React.useState<boolean>(false);

  const openAddBlock = () => {
      setAddBlock(true)
    };
  const closeAddBlock = () => {
      setAddBlock(false)
    };

  const arrList = request.length > 0 ? request : content

  return (
    <Box sx={{m:'5%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'}}>
      {arrList.map( ( data: Props )  => (
        idEdit && idEdit === data.id ?
          <EditBlock data={data} key={data.id}/> :
          <LineContact data={data} key={data.id}/>
      ))}
      <Box sx={{display: `${addBlock ? 'block' : 'none'}`, width: "100%"}}>
        <EditBlock close={closeAddBlock}/>
      </Box>
      <Fab color="primary"
      sx={{ my: '1em', display: `${addBlock ? 'none' : ''}`}}
      onClick={openAddBlock}>
        <AddIcon />
      </Fab>
    </Box>
  );
}
