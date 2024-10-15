import React, { useState, useEffect } from 'react';

export const UserDetails = ({ onSelectUsers }) => {
  const [userDetails, setUserDetails] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => setUserDetails(data));
  }, []);

  const handleCheckboxChange = (user) => {
    const isSelected = selectedUsers.some((u) => u.id === user.id);
    const newSelectedUsers = isSelected
      ? selectedUsers.filter((u) => u.id !== user.id)
      : [...selectedUsers, user];

    setSelectedUsers(newSelectedUsers);
    onSelectUsers(newSelectedUsers);
  };

  return (
    <div>
      {userDetails.map((user) => (
        <div key={user.id}>
          <input
            type="checkbox"
            onChange={() => handleCheckboxChange(user)}
          />
          <span>user number: {user.id}</span>
        </div>
      ))}
    </div>
  );
};
