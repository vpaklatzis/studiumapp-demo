import cuid from 'cuid';
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Header, Segment } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import { createEvent, updateEvent } from '../eventActions';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../../../app/common/form/MyTextInput';
import MyTextArea from '../../../app/common/form/MyTextArea';
import MySelectInput from '../../../app/common/form/MySelectInput';
import { categoryData } from '../../../app/api/categoryOptions';
import MyDateInput from '../../../app/common/form/MyDateInput';

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

    const validationSchema = Yup.object({
        title: Yup.string().required('You must provide a title'),
        category: Yup.string().required('You must provide a category'),
        description: Yup.string().required(),
        city: Yup.string().required(),
        venue: Yup.string().required(),
        date: Yup.string().required()
    });

    return (
        <Segment clearing>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    selectedEvent 
                    ? dispatch(updateEvent({...selectedEvent, ...values}))
                    : dispatch(
                        createEvent({
                            ...values, 
                            id: cuid(), 
                            hostedBy: 'Bob', 
                            attendees: [], 
                            hostPhotoURL: '/assets/user.png'
                    })
                );
                    history.push('/events');
                }}
            >
                {({isSubmitting, dirty, isValid}) => (
                    <Form className='ui form'>
                    <Header sub color='teal' content='Event Details' />
                    <MyTextInput name='title' placeholder='Event title' />
                    <MySelectInput name='category' placeholder='Event category' options={categoryData} />
                    <MyTextArea name='description' placeholder='Description' />
                    <Header sub color='teal' content='Event Location Details' />
                    <MyTextInput name='city' placeholder='City' />
                    <MyTextInput name='venue' placeholder='Venue' />
                    <MyDateInput 
                        name='date' 
                        placeholderText='Event date' 
                        timeformat='HH:mm'
                        showTimeselect
                        timeCaption='time'
                        dateFormat='MMMM d, yyyy h:mm a'
                    />
                    <Button 
                        loading={isSubmitting}
                        disabled={!isValid || !dirty || isSubmitting}
                        type='submit' 
                        floated='right' 
                        content='Submit' 
                        style={{ borderRadius: '10px', backgroundColor: '#FA696D', color: '#f9f9f9' }} 
                    />
                    <Button 
                        disabled={isSubmitting}
                        as={Link}
                        to='/events'
                        type='submit' 
                        floated='right' 
                        content='Cancel' 
                        style={{borderRadius: '10px'}} 
                    />
                </Form>
                )}
            </Formik>
        </Segment>
    )
}