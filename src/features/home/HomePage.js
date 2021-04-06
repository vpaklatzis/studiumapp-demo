import React from 'react';
import { Container, Header, Segment, Image, Button, Icon } from 'semantic-ui-react';

export default function HomePage() {
    return (
        <Segment inverted textAlign='center' vertical className='masthead'>
            <Container>
                <Header as='h1' inverted>
                    <Image src='/assets/Studium.png' alt='logo' style={{marginBottom: 12, height: '90px', width: '420px'}} />
                </Header>
                <Button size='huge' inverted style={{ borderRadius: '10px', color: '#FA696D', border: '2px solid #FA696D' }}>
                    Get Started
                    <Icon name='right arrow' inverted style={{color: '#FA696D'}}/>
                </Button>
            </Container>
        </Segment>
    )
}