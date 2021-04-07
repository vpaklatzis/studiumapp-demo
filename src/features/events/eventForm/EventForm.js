import cuid from 'cuid';
import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, Header, Segment } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import { createEvent, updateEvent } from '../eventActions';

export default function EventForm({ match, history }) {

    const dispatch = useDispatch();

    const selectedEvent = useSelector((state) => state.event.events.find(e => (e.id === match.params.id)));

    const initialValues = selectedEvent ?? {
        title: '',
        category: '',
        description: '',
        city: '',
        venue: '',
        date: ''
    };

    const [values, setValues] = useState(initialValues);

    function handleFormSubmit() {

        selectedEvent 
            ? dispatch(updateEvent({...selectedEvent, ...values}))
            : dispatch(
                createEvent({
                    ...values, 
                    id: cuid(), 
                    hostedBy: 'Bob', 
                    attendees: [], 
                    hostPhotoURL: '/assets/user.png'
            }));

        history.push('/events');
    }

    function handleInputChange(e) {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    }

    return (
        <Segment clearing>
            <Header content={selectedEvent ? 'Edit' : 'Create new event' } />
            <Form onSubmit={handleFormSubmit}>
                <Form.Field>
                    <input 
                    type="text" 
                    placeholder='Event title' 
                    name='title'
                    value={values.title} 
                    onChange={(e) => handleInputChange(e)}
                />
                </Form.Field>
                <Form.Field>
                    <input 
                    type="text" 
                    placeholder='category' 
                    name='category'
                    value={values.category} 
                    onChange={(e) => handleInputChange(e)}
                />
                </Form.Field>
                <Form.Field>
                    <input 
                    type="text" 
                    placeholder='Description' 
                    name='description'
                    value={values.description} 
                    onChange={(e) => handleInputChange(e)}
                />
                </Form.Field>
                <Form.Field>
                    <input 
                    type="text" 
                    placeholder='City' 
                    name='city'
                    value={values.city} 
                    onChange={(e) => handleInputChange(e)}
                />
                </Form.Field>
                <Form.Field>
                    <input 
                    type="text" 
                    placeholder='Venue' 
                    name='venue'
                    value={values.venue} 
                    onChange={(e) => handleInputChange(e)}
                />
                </Form.Field>
                <Form.Field>
                    <input 
                    type="date" 
                    placeholder='Date' 
                    name='date'
                    value={values.date} 
                    onChange={(e) => handleInputChange(e)}
                />
                </Form.Field>
                <Button 
                    type='submit' 
                    floated='right' 
                    content='Submit' 
                    style={{ borderRadius: '10px', backgroundColor: '#FA696D', color: '#f9f9f9' }} 
                />
                <Button 
                    as={Link}
                    to='/events'
                    type='submit' 
                    floated='right' 
                    content='Cancel' 
                    style={{borderRadius: '10px'}} 
                />
            </Form>
        </Segment>
    )
}