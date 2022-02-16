import React, { useEffect, useState } from 'react';

import UsersList from '../components/UsersList';
import { useHttpClient } from '../../shared/hooks/http-hooks';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Users = () => {
  const { isLoading, sendRequest } = useHttpClient();
  const [loadedUsers, setLoadedUsers] = useState();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          'http://localhost:5000/api/users'
        );

        setLoadedUsers(responseData.users);
        console.log(loadedUsers);
      } catch (err) {}
    };
    fetchUsers();
  }, [sendRequest]);

  return (
    <React.Fragment>
      {isLoading && (
        <div className="center">
        </div>
      )}
      <div className='my-4'style={{textAlignVertical: "center",textAlign: "center",}} >
        <Link to="/AddUser">
          <Button variant="success">Ajouter un Utilisateur</Button>
        </Link>
      </div>
      {!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
    </React.Fragment>
  );
};

export default Users;
