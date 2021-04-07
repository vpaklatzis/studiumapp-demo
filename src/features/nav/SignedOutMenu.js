import React from 'react';
import { Button, Menu } from 'semantic-ui-react';

export default function SignedOutMenu({setAuthenticated}) {
    return (
        <Menu.Item position='right'>
            <Button 
            onClick={() => setAuthenticated(true)}
                inverted 
                content='Sign in' 
                style={{ borderRadius: '10px', backgroundColor: '#f9f9f9', color: '#FA696D', border: '2px solid #FA696D' }} 
            />
            <Button 
                inverted 
                content='Sign up' 
                style={{ marginLeft: '0.2em', borderRadius: '10px', backgroundColor: '#FA696D', color: '#f9f9f9', height: '40px' }} 
            />
        </Menu.Item>
    )
}