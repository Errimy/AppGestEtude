import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


import UsersList from '../components/UsersList';
import { useHttpClient } from '../../shared/hooks/http-hooks';

const ClasseUser = () => {
  const { isLoading, sendRequest } = useHttpClient();
  const [loadedUsers, setLoadedUsers] = useState();
  const classeId = useParams().classeId;


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
            `http://localhost:5000/api/users/classe/${classeId}`
        );

        setLoadedUsers(responseData.users);
        console.log(loadedUsers);
      } catch (err) {}
    };
    fetchUsers();
  }, [sendRequest, classeId]);

  return (
    <React.Fragment>
      {isLoading && (
        <div className="center">
        </div>
      )}
      <div className='my-4'style={{textAlignVertical: "center",textAlign: "center",}} >
          Liste des étudiants de cette classe:
      </div>
      {!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
    </React.Fragment>
  );
};

export default ClasseUser;
