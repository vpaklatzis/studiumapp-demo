import React from 'react';
import { useDispatch } from 'react-redux';
import ModalWrapper from '../../app/common/modals/ModalWrapper';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../../app/common/form/MyTextInput';
import { Button } from 'semantic-ui-react';
import { closeModal } from '../../app/common/modals/modalReducer';
import { signInUser } from './authActions';

export default function LoginForm() {

    const dispatch = useDispatch();

    return (
        <ModalWrapper size='mini' header='Sign in'>
            <Formik 
                initialValues={{email: '', password: ''}}
                validationSchema={Yup.object({
                    email: Yup.string().required().email(),
                    password: Yup.string().required()
                })}
                onSubmit={(values, {setSubmitting}) => {
                    dispatch(signInUser(values));
                    setSubmitting(false);
                    dispatch(closeModal());
                }}
            >
                {({isSubmitting, isValid, dirty}) => (
                    <Form className='ui form'>
                        <MyTextInput name='email' placeholder='Email Address' />
                        <MyTextInput name='password' placeholder='Password' type='password' />
                        <Button
                            loading={isSubmitting}
                            disabled={!isValid || !dirty || isSubmitting}
                            type='submit'
                            
                            size='large'
                            color='teal'
                            content='Sign in'
                        />
                    </Form>
                )}
            </Formik>
        </ModalWrapper>
    )
}