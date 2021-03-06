import React from 'react';
import { useDispatch } from 'react-redux';
import ModalWrapper from '../../app/common/modals/ModalWrapper';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../../app/common/form/MyTextInput';
import { Button, Divider, Label } from 'semantic-ui-react';
import { closeModal } from '../../app/common/modals/modalReducer';
import { signInWithEmail } from '../../app/firestore/firebaseService';
import SocialLogin from './SocialLogin';

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
                onSubmit={async (values, {setSubmitting, setErrors}) => {
                    try {
                        await signInWithEmail(values);
                        setSubmitting(false);
                        dispatch(closeModal());
                    } catch (error) {
                        setErrors({auth: 'Username or Password is invalid'})
                        setSubmitting(false);
                    }
                }}
            >
                {({isSubmitting, isValid, dirty, errors}) => (
                    <Form className='ui form'>
                        <MyTextInput name='email' placeholder='Email Address' />
                        <MyTextInput name='password' placeholder='Password' type='password' />
                        {errors.auth && <Label basic color='red' style={{marginBottom: 10}} content={errors.auth} />}
                        <Button
                            loading={isSubmitting}
                            disabled={!isValid || !dirty || isSubmitting}
                            type='submit'
                            fluid
                            size='medium'
                            style={{backgroundColor: '#FA696D', color: '#f9f9f9'}}
                            content='Sign in'
                        />
                        <Divider horizontal>or</Divider>
                        <SocialLogin />
                    </Form>
                )}
            </Formik>
        </ModalWrapper>
    )
}