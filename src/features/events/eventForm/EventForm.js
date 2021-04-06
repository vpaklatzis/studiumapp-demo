import React from 'react';
import { Button, Form, Header, Segment } from 'semantic-ui-react';

export default function EventForm() {
    return (
        <Segment clearing>
            <Header content='Create new event' />
            <Form>
                <Form.Field>
                    <input type="text" placeholder='Event title' />
                </Form.Field>
                <Form.Field>
                    <input type="text" placeholder='category' />
                </Form.Field>
                <Form.Field>
                    <input type="text" placeholder='Description' />
                </Form.Field>
                <Form.Field>
                    <input type="text" placeholder='City' />
                </Form.Field>
                <Form.Field>
                    <input type="text" placeholder='Venue' />
                </Form.Field>
                <Form.Field>
                    <input type="date" placeholder='Date' />
                </Form.Field>
                <Button type='submit' floated='right' content='Submit' style={{ borderRadius: '10px', backgroundColor: '#FA696D', color: '#f9f9f9' }} />
                <Button type='submit' floated='right' content='Cancel' style={{borderRadius: '10px'}} />
            </Form>
        </Segment>
    )
}