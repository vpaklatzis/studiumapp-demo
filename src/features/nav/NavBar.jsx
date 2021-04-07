import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Container, Menu } from 'semantic-ui-react';
import SignedInMenu from './SignedInMenu';
import SignedOutMenu from './SignedOutMenu';
import { useSelector } from 'react-redux';

export default function NavBar({ setFormOpen }) {

    const {authenticated} = useSelector(state => state.auth);

    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item as={NavLink} exact to='/' header>
                    <img src="/assets/Studium.png" alt="logo" style={{height: '30px', width: '140px'}} />
                </Menu.Item>
                <Menu.Item as={NavLink} to='/events' name='Events' style={{backgroundColor: '#FA696D'}}/>
                <Menu.Item as={NavLink} to='/sandbox' name='Sandbox' style={{backgroundColor: '#FA696D'}}/>
                { authenticated && 
                <Menu.Item as={NavLink} to='/createEvent'>
                    <Button inverted content='Create Event' style={{ borderRadius: '10px', backgroundColor: '#f9f9f9', color: '#FA696D', border: '1px solid #FA696D' }}/>
                </Menu.Item> }
            { authenticated ? (
                    <SignedInMenu /> 
                ) : ( 
                    <SignedOutMenu /> 
                )} 
            </Container>
        </Menu>
    )
}