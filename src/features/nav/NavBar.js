import React, {useState} from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { Button, Container, Menu } from 'semantic-ui-react';
import SignedInMenu from './SignedInMenu';
import SignedOutMenu from './SignedOutMenu';

export default function NavBar({setFormOpen}) {

    const [authenticated, setAuthenticated] = useState(false);

    const history = useHistory();

    function handleSignOut() {
        setAuthenticated(false);
        history.push('/');
    }

    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item as={NavLink} exact to='/' header>
                    <img src="/assets/Studium.png" alt="logo" style={{height: '30px', width: '140px'}} />
                </Menu.Item>
                <Menu.Item as={NavLink} to='/events' name='Events' style={{backgroundColor: '#FA696D'}}/>
                { authenticated && 
                <Menu.Item as={NavLink} to='/createEvent'>
                    <Button onClick={() => setFormOpen(true)} inverted content='Create Event' style={{ borderRadius: '10px', backgroundColor: '#f9f9f9', color: '#FA696D', border: '1px solid #FA696D' }}/>
                </Menu.Item> }
            { authenticated ? (
                    <SignedInMenu signOut={handleSignOut} /> 
                ) : ( 
                    <SignedOutMenu setAuthenticated={setAuthenticated} /> 
                )} 
            </Container>
        </Menu>
    )
}