import React from "react";
import './UsersList.css';
import UserItem from './UserItem';
import { Table,Button } from "react-bootstrap";

// use this in classe to show students of said classe
const UsersList = props =>{
    if(props.items.length === 0 )
    {
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
            {props.items.map(user => (
            <UserItem 
                key = {user.id}
                nom={user.nom}
                prenom = {user.prenom}
                role = {user.role}
            />)
        )}
    </tbody>
    </Table>)};

export default UsersList;