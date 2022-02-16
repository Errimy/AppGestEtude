import React from "react";
import './UsersList.css';
import UserItem from './UserItem';
import { Table,Button } from "react-bootstrap";
// use this in classe to show students of said classe
const UsersList = props =>{
    if(props.items.length === 0 ){
        return (
            <div className='center'>
                <h2>Il n'existe pas d'étudiants dans cette classe.</h2>
            </div>
        )
    }
    return (
        <Table striped hover>
        <thead style={{textAlignVertical: "center",textAlign: "center",}}>
          <tr>
            <th>Nom</th>
            <th>Prenom</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
        <td className="users-list" style={{textAlignVertical: "center",textAlign: "center",}}>
            {props.items.map(user => (
            <UserItem 
            nom={user.nom}
            />)
        )}
        </td>
    <td className="users-list" style={{textAlignVertical: "center",textAlign: "center",}}>
            {props.items.map(user => (
            <UserItem 
            prenom={user.prenom}
            />)
        )}
    </td>
    <td className="users-list" style={{textAlignVertical: "center",textAlign: "center",}}>
            {props.items.map(user => (
            <UserItem 
            role={user.role}
            />)
        )}
    </td>
    <td className="users-list" style={{textAlignVertical: "center",textAlign: "center",}}>
        <Button variant="outline-info">Modifier</Button>
        <Button variant="outline-danger">Supprimer</Button>
    </td>
    
    </tbody>
    </Table>)};

export default UsersList;