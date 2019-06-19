import React, { useState, useEffect } from 'react';
import {Table, Button} from "semantic-ui-react"
import AddEmployeeModal from './AddEmployeeModal';

function EmployeeList(){
    const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false)
    const [employees, setEmployees] = useState([])

    const fetchEmployees = () => {

        fetch("/api/employees")
        .then((res) => res.json())
        .then((json) => setEmployees(json))
    }

    useEffect(() => {
        fetchEmployees()
    }, [])

    const handleDelete = (id) => {
        fetch('/api/employees/'+id, {
            method: 'DELETE'
        })
        .then((res) => {
            fetchEmployees()
        })
    }

    const handleAdd = (EMPLOYEE_ID, FIRST_NAME, LAST_NAME) => {
        setShowAddEmployeeModal(false)
        fetch('/api/employees', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({EMPLOYEE_ID, FIRST_NAME, LAST_NAME})
        })
        .then((res) => res.json())
        .then((json) => setEmployees(json))
    }
    
    return (
        <>
        <Table celled striped>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell colSpan='4'>Employee Information</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {employees.map((it, i) => <ListItem key={i} {...it} onDelete={handleDelete}/>)}
            </Table.Body>
        </Table>
        <Button style={{float: "right", margin: "15px"}} onClick={() => setShowAddEmployeeModal(true)}>add</Button>
        <AddEmployeeModal 
            open={showAddEmployeeModal} 
            onAdd={handleAdd}
            onCancel={() => setShowAddEmployeeModal(false)}/>
        </>
    )
}

const ListItem = ({EMPLOYEE_ID, LAST_NAME, FIRST_NAME, onDelete}) => (
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

export default EmployeeList