import React from 'react';
import {useDispatch} from 'react-redux';
import { Button } from 'semantic-ui-react';
import { closeModal } from '../../app/common/modals/modalReducer';
import { socialLogin } from '../../app/firestore/firebaseService';

export default function SocialLogin() {

    const dispatch = useDispatch();


    function handleSocialLogin(provider) {
        dispatch(closeModal());
        socialLogin(provider);
    }

    return (
        <>
            <Button onClick={() => handleSocialLogin('google')} icon='google' fluid color='google plus' style={{marginBottom: 10}} size='small' content='Sign in with Google' />
            <Button onClick={() => handleSocialLogin('facebook')} icon='facebook' fluid color='facebook' size='small' content='Sign in with Facebook' />
        </>
    )
}