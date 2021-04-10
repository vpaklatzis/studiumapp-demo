import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { Button, Header, Image, Item, Segment } from 'semantic-ui-react';
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import { addUserAttendance, cancelUserAttendance } from '../../../app/firestore/firestoreService';
import { useSelector } from 'react-redux';
import UnauthModal from '../../auth/UnauthModal';

const eventImageStyle = {
    filter: 'brightness(30%)'
};

const eventImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    width: '100%',
    height: 'auto',
    color: 'white'
};

export default function EventDetailedHeader({ event, isHost, isGoing }) {
    const [loading, setLoading] = useState(false);
    const {authenticated} = useSelector((state) => state.auth);
    const [modalOpen, setModalOpen] = useState(false);

    async function handleUserJoinEvent() {
        setLoading(true);
        try {
            await addUserAttendance(event);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    async function handleUserLeaveEvent() {
        setLoading(true);
        try {
            await cancelUserAttendance(event);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            {modalOpen && 
                <UnauthModal setModalOpen={setModalOpen} />
            }
            <Segment.Group>
                <Segment basic attached="top" style={{padding: '0'}}>
                    <Image 
                        src={`/assets/categoryImages/${event.category}.jpg`} 
                        fluid 
                        style={eventImageStyle} 
                    />

                    <Segment basic style={eventImageTextStyle}>
                        <Item.Group>
                            <Item>
                                <Item.Content>
                                    <Header
                                        size="huge"
                                        content={event.title}
                                        style={{color: 'white'}}
                                    />
                                    <p>{format(event.date, 'MMMM d, yyyy h:mm a')}</p>
                                    <p>
                                        Hosted by <strong><Link to={`/profile/${event.hostUid}`}>{event.hostedBy}</Link></strong>
                                    </p>
                                </Item.Content>
                            </Item>
                        </Item.Group>
                    </Segment>
                </Segment>

                <Segment attached="bottom" clearing>
                    {!isHost && (
                        <>
                            {isGoing ? (
                                <Button onClick={handleUserLeaveEvent} loading={loading}>Cancel</Button>
                            ) : (
                                <Button 
                                    onClick={authenticated ? handleUserJoinEvent : () => setModalOpen(true)} 
                                    loading={loading} 
                                    style={{backgroundColor: '#FA696D', color: "#f9f9f9"}} 
                                >
                                    Join
                                </Button>
                            )}  
                        </>
                    )}
                    {isHost && 
                        <Button as={Link} to={`/manage/${event.id}`} floated="right">
                            Manage Post
                        </Button>
                    }
                </Segment>
            </Segment.Group>
        </>  
    );
}