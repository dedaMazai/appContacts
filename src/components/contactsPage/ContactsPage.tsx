import React from 'react';
import SearchBar from './searchBar';
import ListContact from './listContacts';

const ContactsPage: React.FC = () => {
  return (
    <>
      <SearchBar/>
      <ListContact/>
    </>
  );
}

export default ContactsPage;
