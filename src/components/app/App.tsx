import React from 'react';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import MyRouter from '../routes';

export default function App() {
  const {token} = useTypedSelector(state => state.cards)

  const isAuthenticated = !!token;

  return (
    <MyRouter isAuthenticated={ isAuthenticated }/>
  );
}
