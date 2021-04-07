import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Icon, Item, List, Segment } from 'semantic-ui-react';
import EventListAttendee from './EventListAttendee';
import { deleteEvent } from '../eventActions';

export default function EventListItem({ event }) {

    const dispatch = useDispatch();

    return (
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image size='tiny' circular src={event.hostPhotoURL} />
                        <Item.Content>
                            <Item.Header content={event.title} />
                            <Item.Description>
                                Hosted By {event.hostedBy}
                            </Item.Description>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <span>
                    <Icon name='clock' /> {event.date}
                    <Icon name='marker' /> {event.venue}
                </span>
            </Segment>
            <Segment secondary>
                <List horizontal>
                    {event.attendees.map((attendee) => (
                        <EventListAttendee key={attendee.id} attendee={attendee} />
                    ))}
                </List>
            </Segment>
            <Segment clearing>
                <div>{event.description}</div>
                <Button 
                    onClick={() => dispatch(deleteEvent(event.id))} 
                    style={{backgroundColor: '#f9f9f9', color: '#fa696d', borderRadius: '10px', border: '1px solid #FA696D'}} 
                    floated='right' 
                    content='Delete' 
                />
                <Button 
                    as={Link} to={`/events/${event.id}`}
                    style={{backgroundColor: '#fa696d', color: '#f9f9f9', borderRadius: '10px', height: '38px'}} 
                    floated='right' 
                    content='View' 
                />
            </Segment>
        </Segment.Group>
    )
}