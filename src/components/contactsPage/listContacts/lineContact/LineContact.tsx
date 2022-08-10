import * as React from 'react';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import { useDispatch } from 'react-redux';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import BorderColorIcon from '@mui/icons-material/BorderColor';

interface Props {
  data: {
    name: string,
    tel: string,
    info: string,
    id: number
  }
}

const  LineContact: React.FC<Props> = (props: Props) => {
  const {data} = props
  const {content, expanded} = useTypedSelector(state => state.cards)
  const dispatch = useDispatch()

  const handleChange =
    (panelID: number) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      dispatch({type:"SET_EXPANDED", payload: isExpanded ? panelID : false})
    };

  const handleDel =
    (id: number) => (event: React.MouseEvent<HTMLHeadingElement>) => {
      event.stopPropagation();
      const newContent = content
      const idDel = content.findIndex(el => el.id === id)
      newContent.splice(idDel, 1)
      dispatch({type:"SET_CONTENT", payload: newContent})
    };

  const handleEdit =
    (id: number) => (event: React.MouseEvent<HTMLHeadingElement>) => {
      event.stopPropagation();
      dispatch({type:"SET_ID_EDIT", payload: id})
    };

  return (
    <Accordion sx={{ width: '100%'}}  expanded={expanded === data.id} onChange={handleChange(data.id)}>
      <AccordionSummary
        aria-controls="panel1bh-content"
        id="panel1bh-header"
      >
        <Typography sx={{ width: '33%', flexShrink: 0, fontWeight: '600' }}>
          {data.name}
        </Typography>
        <Typography sx={{ width: '65%', color: 'text.secondary' }}>{data.tel}</Typography>
        <div onClick={handleEdit(data.id)}>
          <BorderColorIcon sx={{ mx: '1em', display: `${expanded === data.id ? 'block' : 'none'}`}}/>
        </div>
        <div onClick={handleDel(data.id)}><DeleteOutlineIcon/></div>
      </AccordionSummary>
      <AccordionDetails>
        <Typography sx={{ fontWeight: '600'}}>
          Информация:
        </Typography>
        <Typography>
          {data.info}
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
}

export default LineContact;
