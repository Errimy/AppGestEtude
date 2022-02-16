import React, { useEffect, useState } from 'react';

import { useHttpClient } from '../../shared/hooks/http-hooks';
import { Button } from 'react-bootstrap';
import ExamenList from '../components/ExamenList';

const Examens = () => {
  const { isLoading, sendRequest } = useHttpClient();
  const [loadedClasses, setLoadedClasses] = useState();

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const responseData = await sendRequest(
          'http://localhost:5000/api/examens'
        );

        setLoadedClasses(responseData.examens);
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
      <div className='my-4'style={{textAlignVertical: "center",textAlign: "center",}} >
        <Button variant="success">Ajouter un Examen</Button>
      </div>


      {!isLoading && loadedClasses && <ExamenList items={loadedClasses} />}
    </React.Fragment>
  );
};

export default Examens;
