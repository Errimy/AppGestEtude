import React, { useEffect, useState } from 'react';

import ClasseList from '../components/ClasseList';
import { useHttpClient } from '../../shared/hooks/http-hooks';
import { Button } from 'react-bootstrap';

const Classes = () => {
  const { isLoading, sendRequest } = useHttpClient();
  const [loadedClasses, setLoadedClasses] = useState();

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const responseData = await sendRequest(
          'http://localhost:5000/api/classes'
        );

        setLoadedClasses(responseData.classes);
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
      <div className='my-4'style={{textAlignVertical: "center",textAlign: "center",}} >
      <Button variant="success">Ajouter une Classe</Button></div>
      {!isLoading && loadedClasses && <ClasseList items={loadedClasses} />}
    </React.Fragment>
  );
};

export default Classes;
