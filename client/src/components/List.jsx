import React, { useState, useEffect } from 'react';
import {Table, Button} from "semantic-ui-react"
import AddEmployeeModal from './AddEmployeeModal';

function List({title, AddValueModal, EditValueModal, children, onAdd}){
    const [showAddValueModal, setShowAddValueModal] = useState(false)
    const [showEditValueModal, setShowEditValueModal] = useState(false)
    // const [values, setValues] = useState([])

    // const fetchEmployees = () => {
    //     fetch("/api/employees")
    //     .then((res) => res.json())
    //     .then((json) => setEmployees(json))
    // }

    // useEffect(() => {
    //     fetchEmployees()
    // }, [])

    // const handleDelete = (id) => {
    //     fetch('/api/employees/'+id, {
    //         method: 'DELETE'
    //     })
    //     .then((res) => {
    //         fetchEmployees()
    //     })
    // }

    const handleAdd = (payload) => {
        setShowAddValueModal(false)
        onAdd(payload)
    }
    
    return (
        <>
        <Table celled striped>
            <Table.Header>
                <Table.Row>
                    {title}
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {children}
            </Table.Body>
        </Table>
        <Button style={{float: "right", margin: "15px"}} onClick={() => setShowAddValueModal(true)}>add</Button>
        <addValueModal 
            open={showAddValueModal} 
            onAdd={handleAdd}
            onCancel={() => setShowAddValueModal(false)}/>
        </>
    )
}

export const ListItem = ({EMPLOYEE_ID, LAST_NAME, FIRST_NAME, onDelete}) => (
    <Table.Row>
        <Table.Cell>{EMPLOYEE_ID}</Table.Cell>
        <Table.Cell>{LAST_NAME}</Table.Cell>
        <Table.Cell>{FIRST_NAME}</Table.Cell>
        <Table.Cell collapsing>
            <Button.Group >
                <Button>edit</Button>
                <Button.Or />
                <Button onClick={() => onDelete(EMPLOYEE_ID)}>delete</Button>
            </Button.Group>
        </Table.Cell>
    </Table.Row>
)

export default List