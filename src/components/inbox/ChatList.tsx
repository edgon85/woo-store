import React from 'react';
import { UserListItem } from './UserListItem';

export const ChatList = () => {
  return (
    <>
      <div className="border-b-2 py-4 px-2">
        <h3>Mensajes</h3>
      </div>
      {/* <!-- end search compt --> */}
      {/* <!-- user list --> */}
      <UserListItem
        profilePicture="https://source.unsplash.com/_7LbC5J-jw4/600x600"
        username="Luis1994"
      />
      <UserListItem
        profilePicture="https://source.unsplash.com/otT2199XwI8/600x600"
        username="Everest Trip 2021"
      />
      <UserListItem
        profilePicture="https://source.unsplash.com/L2cxSuKWbpo/600x600"
        username="MERN Stack"
      />
      <UserListItem
        profilePicture="https://source.unsplash.com/vpOeXr5wmR4/600x600"
        username="Javascript Indonesia"
      />
    </>
  );
};
