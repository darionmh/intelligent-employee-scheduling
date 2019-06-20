import React, { Component, useState } from 'react'
import {Link, withRouter} from "react-router-dom"
import {Menu} from "semantic-ui-react"

function NavBar({history}){
    const [active, setActive] = useState("home")

    const handleItemClick = (e, {name}) => {
        if(name === active) return
        setActive(name)
        history.push(name)
    }

    return (
        <Menu pointing secondary>
            <Menu.Item name='home' active={active === 'home'} onClick={handleItemClick}/>
            <Menu.Item name='employees' active={active === 'employees'} onClick={handleItemClick}/>
            <Menu.Item name='shifts' active={active === 'shifts'} onClick={handleItemClick}/>
            
            {/* <Link to="/" activeClassName="hurray">Home</Link>
            
            <Link to="/employees" activeClassName="hurray">Employees</Link> */}
        </Menu>
    )
}

export default withRouter(NavBar)