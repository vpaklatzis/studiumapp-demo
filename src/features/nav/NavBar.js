import React from 'react';
import { Button, Container, Menu } from 'semantic-ui-react';

export default function NavBar({setFormOpen}) {
    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item header>
                    <img src="/assets/Studium.png" alt="logo" style={{height: '30px', width: '135px'}} />
                </Menu.Item>
                <Menu.Item name='Events' />
                <Menu.Item>
                    <Button onClick={() => setFormOpen(true)} inverted content='Create Event' style={{ borderRadius: '10px', backgroundColor: '#f9f9f9', color: '#FA696D', border: '2px solid #FA696D' }}/>
                </Menu.Item>
                <Menu.Item position='right'>
                    <Button inverted content='Sign in' style={{ borderRadius: '10px', backgroundColor: '#f9f9f9', color: '#FA696D', border: '2px solid #FA696D' }}/>
                    <Button inverted content='Sign up' style={{ marginLeft: '0.2em', borderRadius: '10px', backgroundColor: '#FA696D', color: '#f9f9f9', height: '40px' }} />
                </Menu.Item>
            </Container>
        </Menu>
    )
}