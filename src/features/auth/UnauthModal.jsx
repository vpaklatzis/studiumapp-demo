import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Divider, Modal } from 'semantic-ui-react';
import { openModal } from '../../app/common/modals/modalReducer';

export default function UnauthModal({ history, setModalOpen }) {
    const [open,setOpen] = useState(true);
    const dispatch = useDispatch();
    const { prevLocation } = useSelector((state) => state.auth);

    function handleClose() {
        if (!history) {
            setOpen(false);
            setModalOpen(false);
            return;
        }
        if (history && prevLocation) {
            history.push(prevLocation.pathname);
        } else {
            history.push('/events');
        }
        setOpen(false);
    }

    function handleOpenLoginModal({modalType}) {
        dispatch(openModal({modalType}));
        setOpen(false);
        setModalOpen(false);
    }

    return (
        <Modal open={open} size='mini' onClose={handleClose}>
            <Modal.Header context='Sign in' />
            <Modal.Content>
                <p>Sign in/up</p>
                <Button.Group widths={4}>
                    <Button 
                        fluid 
                        color='teal' 
                        content='Sign in' 
                        onClick={() => handleOpenLoginModal('LoginForm')}
                    />
                    <Button.Or />
                    <Button 
                        fluid 
                        color='green' 
                        content='Sign up' 
                        onClick={() => handleOpenLoginModal('RegisterForm')}
                    />
                    <Divider />
                    <div style={{textAlign: 'center'}}>
                        <p>Cliick Cancel to continue as guest</p>
                        <Button onClick={handleClose} content='Cancel' />
                    </div>
                </Button.Group>
            </Modal.Content>
        </Modal>
    )
}