import React, { useState, useEffect } from 'react';
import {Modal, Form, Button, Icon, Popup} from "semantic-ui-react"

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function AddEmployeeModal({open, onCancel, onAdd}){
    const [employeeIdError, setEmployeeIdError] = useState(false)
    const [employeeId, setEmployeeId] = useState("")
    const [firstNameError, setFirstNameError] = useState(false)
    const [firstName, setFirstName] = useState("")
    const [lastNameError, setLastNameError] = useState(false)
    const [lastName, setLastName] = useState("")

    const validateFields = () => {
        if(!isNumeric(employeeId)){
            setEmployeeIdError(true)
            return
        }else{
            setEmployeeIdError(false)
        }

        onAdd(employeeId, firstName.toUpperCase(), lastName.toUpperCase())
    }

    return (
        <Modal open={open}>
            <Modal.Header>Add Employee</Modal.Header>
            <Modal.Content>
                <Form>
                    <Form.Group widths='equal'>
                    <StatusInput label='Employee Id' placeholder='Employee Id' onChange={e => setEmployeeId(e.target.value)} errorMessage="Must be numeric." error={employeeIdError}/>
                    <StatusInput label='First name' placeholder='First name' onChange={e => setFirstName(e.target.value)}/>
                    <StatusInput label='Last name' placeholder='Last name' onChange={e => setLastName(e.target.value)}/>
                    </Form.Group>
                </Form>
            </Modal.Content>
            <Modal.Actions>
                <Button negative onClick={() => onCancel()}>Cancel</Button>
                <Button positive onClick={validateFields}>Add</Button>
            </Modal.Actions>
        </Modal>
    )
}

const StatusInput = ({label, placeholder, onChange, error, errorMessage}) => {
    if(error){
        const inputField = <Form.Input fluid label={label} placeholder={placeholder} onChange={onChange} icon="warning sign"/>
        return <Popup content={errorMessage} trigger={inputField} />
    }else{
        return <Form.Input fluid label={label} placeholder={placeholder} onChange={onChange}/>
    }
}

export default AddEmployeeModal