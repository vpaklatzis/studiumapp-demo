import React from 'react';
import {useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Header, Segment } from 'semantic-ui-react';

export default function ErrorComponent() {

    const { error } = useSelector((state) => state.async);

    return (
        <Segment placeholder>
            <Header textAlign='center' content={error?.message || 'Oops. Something went wrong.'} />
            <Button as={Link} to='/events' style={{marginTop: 20, backgroundColor: '#Fa696D', color: '#f9f9f9'}} content='Return to event page' />
        </Segment>
    )
}