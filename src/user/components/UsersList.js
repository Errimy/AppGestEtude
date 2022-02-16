import React from "react";
import './UsersList.css';
import UserItem from './UserItem';
import { Table } from "react-bootstrap";

// use this in classe to show students of said classe
const UsersList = props =>{
    console.log(props.items);
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
            <th>Id</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
            {props.items.map(user => (
            <UserItem 
                key = {user._id}
                id = {user._id}
                nom={user.nom}
                prenom = {user.prenom}
                role = {user.role}
            />)
        )}
    </tbody>
    </Table>)};

export default UsersList;