import React from 'react';

export const SelectedUsers = ({ users }) => {
  return (
    <div className = "cards-container">
      {users.map((user,index) => (
        <div key={user.id} className={`user-card color-${index % 5}`}>
          <h3>User ID: {user.id}</h3>
          <p>Title: {user.title}</p>
          <p>Body: {user.body}</p>
        </div>
      ))}
    </div>
  );
};
