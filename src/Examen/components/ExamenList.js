import React from "react";
import { Table } from "react-bootstrap";
import ExamenItem from "./ExamenItem";
// use this in classe to show students of said classe
const ExamenList = props =>
{
    console.log(props);

    if(props.items.length === 0 ){
        return (
            <div className='center'>
                <h2>Il n'existe pas encore d'examen pour le moments.</h2>
            </div>
        )
    }
    return (
        <Table striped hover>
            <thead style={{textAlignVertical: "center",textAlign: "center",}}>
                <tr>
                    <th>Matiere de l'examen</th>
                    <th>Nom Etudiant</th>
                    <th>Note</th>
                    <th>Date</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {props.items.map(examen => (
                    <ExamenItem
                        matiere={examen.matiere}
                        nom_etudiant={examen.nom_etudiant}
                        note={examen.note}
                        date={examen.date}
                    />)
                )}
            </tbody>
        </Table>
    )};

export default ExamenList;