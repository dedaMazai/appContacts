import React from 'react';
import { Routes, Route, Navigate} from 'react-router-dom';
import AuthPage from '../authPage';
import ContactsPage from '../contactsPage';

interface Props {
  isAuthenticated: boolean;
}
const MyRouter: React.FC<Props> = (props: Props) => {
  if (props.isAuthenticated){
    return (
      <Routes>
        <Route  path = '/' element={<Navigate to="/contacts"/>}/>
        <Route  path = '/contacts' element={<ContactsPage/>}/>
      </Routes>
    )
  }else{
    return (
      <Routes>
        <Route  path = '/' element={<AuthPage/>}/>
        <Route  path = '/contacts' element={<Navigate to="/"/>}/>
      </Routes>
    )
  }
}

export default MyRouter;