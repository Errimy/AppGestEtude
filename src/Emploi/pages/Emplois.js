import React, { useContext, useEffect, useState } from 'react';

import { useHttpClient } from '../../shared/hooks/http-hooks';
import { Button } from 'react-bootstrap';
import EmploiList from '../components/EmploiList';
import { Link } from 'react-router-dom'
import { AuthContext } from '../../shared/context/auth-context';


const Emplois = () => {
  const { isLoading, sendRequest } = useHttpClient();
  const [loadedClasses, setLoadedClasses] = useState();

  const auth = useContext(AuthContext);
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const responseData = await sendRequest(
          'http://localhost:5000/api/emplois'
        );

        setLoadedClasses(responseData.emplois);
        console.log(loadedClasses);
      } catch (err) {}
    };
    fetchClasses();
  }, [sendRequest]);

  return (
    <React.Fragment>
      {isLoading && (
        <div className="center">
        </div>
      )}

      {auth.user.role =='admin' &&
      <div className='my-4'style={{textAlignVertical: "center",textAlign: "center",}} >
      <Link to="/AddEmploi">
        <Button variant="success">Ajouter un Emploi</Button>
      </Link>
      </div>
      }
      {!isLoading && loadedClasses && <EmploiList items={loadedClasses} />}
    </React.Fragment>
  );
};

export default Emplois;
