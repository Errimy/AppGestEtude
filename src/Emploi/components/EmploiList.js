import React, { useContext } from "react";
import { Table } from "react-bootstrap";
import { AuthContext } from "../../shared/context/auth-context";
import EmploiItem from "./EmploiItem";
// use this in classe to show students of said classe
const EmploiList = props =>
{

    const auth = useContext(AuthContext);

    if(props.items.length === 0 ){
        return (
            <div className='center'>
                <h2>Il n'existe pas encore d'emploi pour le moments.</h2>
            </div>
        )
    }
    return (
        <Table striped hover>
            <thead style={{textAlignVertical: "center",textAlign: "center",}}>
                <tr>
                    <th>Matiere</th>
                    <th>Jour</th>
                    <th>Horaire</th>
                    {auth.user.role=='admin' &&<th>Action</th>}
                </tr>
            </thead>
            <tbody>
                {props.items.map(emploi => (
                    <EmploiItem
                        key={emploi._id}
                        id={emploi._id}
                        matiere={emploi.matiere}
                        jour={emploi.jour}
                        heure={emploi.heure}
                    />)
                )}
            </tbody>
        </Table>
    )};

export default EmploiList;