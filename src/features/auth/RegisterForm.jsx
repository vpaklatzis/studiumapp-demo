import React from 'react';
import { useDispatch } from 'react-redux';
import ModalWrapper from '../../app/common/modals/ModalWrapper';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../../app/common/form/MyTextInput';
import { Button, Divider, Label } from 'semantic-ui-react';
import { closeModal } from '../../app/common/modals/modalReducer';
import { registerInFirebase } from '../../app/firestore/firebaseService';
import SocialLogin from './SocialLogin';

export default function RegisterForm() {

    const dispatch = useDispatch();

    return (
        <ModalWrapper size='mini' header='Sign Up'>
            <Formik 
                initialValues={{displayName: '', email: '', password: ''}}
                validationSchema={Yup.object({
                    displayName: Yup.string().required(),
                    email: Yup.string().required().email(),
                    password: Yup.string().required()
                })}
                onSubmit={async (values, {setSubmitting, setErrors}) => {
                    try {
                        await registerInFirebase(values);
                        dispatch(closeModal());
                    } catch (error) {
                        setSubmitting(false);
                        setErrors({auth: error.message})
                    }
                }}
            >
                {({isSubmitting, isValid, dirty, errors}) => (
                    <Form className='ui form'>
                        <MyTextInput name='displayName' placeholder='Name' />
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
                            content='Sign up'
                        />
                        <Divider horizontal>or</Divider>
                        <SocialLogin />
                    </Form>
                )}
            </Formik>
        </ModalWrapper>
    )
}