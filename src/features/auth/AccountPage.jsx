import { Form, Formik} from 'formik';
import React from 'react';
import { Button, Header, Label, Segment } from 'semantic-ui-react';
import * as Yup from 'yup';
import MyTextInput from '../../app/common/form/MyTextInput';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { updateUserPassword } from '../../app/firestore/firebaseService';

export default function AccountPage() {

    const {currentUser} = useSelector((state) => state.auth);

    return (
        <Segment>
            <Header dividing size='large' content='My account' />
            {currentUser.providerId === 'password' && 
                <>
                    <Header style={{color: '#FA696D', marginTop: 20}} sub content='Change Password' />
                    <Formik
                        initialValues={{newPassword1: '', newPassword2: ''}}
                        validationSchema={Yup.object({
                            newPassword1: Yup.string().required('Password is required'),
                            newPassword2: Yup.string().oneOf([Yup.ref('newPassword1'), null], 'Passwords do not match')
                        })}
                        onSubmit={async (values, {setSubmitting, setErrors}) => {
                            try {
                                await updateUserPassword(values);
                            } catch (error) {
                                setErrors({auth: error.message});
                            } finally {
                                setSubmitting(false);
                            }
                        }}
                    >   
                        {({errors, isSubmitting, isValid, dirty}) => (
                            <Form className='ui form'>
                                <MyTextInput 
                                    name='newPassword1' 
                                    type='password' 
                                    placeholder='New Password' 
                                />
                                <MyTextInput 
                                    name='newPassword2' 
                                    type='password' 
                                    placeholder='Confirm Password' 
                                />
                                {errors.auth && (
                                    <Label 
                                        basic 
                                        color='red' 
                                        style={{marginBottom: 10}} 
                                        content={errors.auth} 
                                    />
                                )}
                                <Button 
                                    type='submit' 
                                    disabled={!isValid || isSubmitting || !dirty} 
                                    loading={isSubmitting}
                                    style={{backgroundColor: '#FA696D', color: '#f9f9f9', display: 'block'}}
                                    size='tiny'
                                    content='Update password'
                                />
                            </Form>
                        )}
                    </Formik>
                </>
            }
            {currentUser.providerId === 'google.com' &&
                <>
                    <Header style={{color: '#FA696D', marginTop: 25}} sub content='Google account' />
                    <p>Please visit Google to update your account</p>
                    <Button icon='google' color='google plus' style={{marginTop: -15}} size='tiny' as={Link} to='https://facebook.com' content='Go to Google' />
                </>
            }
            {currentUser.providerId === 'facebook.com' &&
                <>
                    <Header style={{color: '#FA696D', marginTop: 25}} sub content='Facebook account' />
                    <p>Please visit Facebook to update your account</p>
                    <Button icon='facebook' color='facebook' style={{marginTop: -15}} size='tiny' as={Link} to='https://google.com' content='Go to Facebook' />
                </>
            }
        </Segment>
    )
}