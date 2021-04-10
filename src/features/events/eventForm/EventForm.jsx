import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Button, Confirm, Header, Segment } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import { listenToEvents } from '../eventActions';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../../../app/common/form/MyTextInput';
import MyTextArea from '../../../app/common/form/MyTextArea';
import MySelectInput from '../../../app/common/form/MySelectInput';
import { categoryData } from '../../../app/api/categoryOptions';
import MyDateInput from '../../../app/common/form/MyDateInput';
import useFirestoreDoc from '../../../app/hooks/useFirestoreDoc';
import { addEventToFirestore, cancelEventToggle, listenToEventFromFirestore, updateEventInFirestore } from '../../../app/firestore/firestoreService';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { toast } from 'react-toastify';

export default function EventForm({ match, history }) {

    const dispatch = useDispatch();
    const [loadingCancel, setLoadingCancel] = useState(false);
    const [confirmOpen, setConfimOpen] = useState(false);
    const selectedEvent = useSelector((state) => state.event.events.find(e => (e.id === match.params.id)));
    const initialValues = selectedEvent ?? {
        title: '',
        category: '',
        description: '',
        date: ''
    };

    const { loading, error } = useSelector((state) => state.async);

    const validationSchema = Yup.object({
        title: Yup.string().required('You must provide a title'),
        category: Yup.string().required('You must provide a category'),
        description: Yup.string().required(),
        date: Yup.string().required()
    });

    async function handleCancelToggle(event) {
        setConfimOpen(false);
        setLoadingCancel(true);
        try {
            await cancelEventToggle(event);
            setLoadingCancel(false);
        } catch (error) {
            setLoadingCancel(true);
            toast.error(error.message);
        }
    }

    useFirestoreDoc({
        query: () => listenToEventFromFirestore(match.params.id),
        data: event => dispatch(listenToEvents([event])),
        deps: [match.params.id, dispatch],
        shouldExecute: !!match.params.id
    });

    if (loading) return <LoadingComponent content=''/>;

    if (error) return <Redirect to='/error' />

    return (
        <Segment clearing>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={async (values, {setSubmitting}) => {
                    try {
                        selectedEvent 
                            ? await updateEventInFirestore(values)
                            : await addEventToFirestore(values);
                        setSubmitting(false);
                        history.push('/events');
                    } catch (error) {
                        toast.error(error.message);
                        setSubmitting(false);
                    }
                }}
            >
                {({isSubmitting, dirty, isValid}) => (
                    <Form className='ui form'>
                    <Header style={{color: '#FA696D'}} content='Post Details' />
                    <MyTextInput name='title' placeholder='Title' />
                    <MySelectInput name='category' placeholder='Category' options={categoryData} />
                    <MyTextArea name='description' placeholder='Description' />
                    <MyDateInput 
                        name='date' 
                        placeholderText='Date' 
                        timeformat='HH:mm'
                        showTimeselect
                        timeCaption='time'
                        dateFormat='MMMM d, yyyy h:mm a'
                    />
                    {selectedEvent &&
                        <Button 
                            loading={loadingCancel}
                            type='button' 
                            floated='left'
                            color={selectedEvent.isCancelled ? 'green' : 'red'} 
                            content={selectedEvent.isCancelled ? 'Reactivate Event' : 'Cancel Event'}
                            style={{ borderRadius: '10px'}} //backgroundColor: '#FA696D', color: '#f9f9f9' 
                            onClick={() => setConfimOpen(true)}
                        />}
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
            <Confirm 
                content={selectedEvent?.isCancelled ? 'This will reactivate the event - are you sure?' : 
                'This will cancel the event - are you sure?'}
                open={confirmOpen}
                onCancel={() => setConfimOpen(false)}
                onConfirm={() => handleCancelToggle(selectedEvent)}
            />
        </Segment>
    )
}