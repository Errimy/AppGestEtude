import React from "react";
import ClasseItem from './ClasseItem';
import { Table } from "react-bootstrap";
// use this in classe to show students of said classe
const ClasseList = props =>{
    if(props.items.length === 0 ){
        return (
            <div className='center'>
                <h2>Il n'existe pas encore de classe pour le moments.</h2>
            </div>
        )
    }
    return (
        <Table striped hover>
            <thead style={{textAlignVertical: "center",textAlign: "center",}}>
                <tr>
                    <th>Nom de Classe</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {props.items.map(classe => (
                    <ClasseItem
                        key={classe.id}
                        nom_classe={classe.nom_classe}
                    />)
                )}
            </tbody>
        </Table>
    )};

export default ClasseList;