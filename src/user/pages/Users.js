import React, { useEffect, useState } from 'react';

import UsersList from '../components/UsersList';
// import ErrorModal from '../../shared/components/UIElements/ErrorModal';
// import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hooks';

const Users = () => {
  const { isLoading, setIsLoading } = useState(false);
  const {sendRequest, clearError } = useHttpClient();
  const [loadedUsers, setLoadedUsers] = useState();
  const [error, setError] = useState();
  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('http://localhost:5000/api/users');

        const responseData=await response.json;

        if(!response.ok){
          throw new Error(responseData.message)
        }
        setLoadedUsers(responseData.users);
      } catch (err) {
        
        setError(err.message)
      }
      setIsLoading(false);
    };
    sendRequest();
  }, []);
  const errorHandler=()=>{
    setError(null);
  };
  return (
    <React.Fragment>
      {isLoading && (
        <div className="center">        </div>
      )}
      {!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
    </React.Fragment>
  );
};

export default Users;