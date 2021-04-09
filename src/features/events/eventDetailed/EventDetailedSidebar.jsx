import React from 'react';
import { Link } from 'react-router-dom';
import { Item, Label, Segment } from 'semantic-ui-react';

export default function EventDetailedSidebar({ attendees, hostUid }) {
    return (
        <>
            <Segment
                textAlign="center"
                style={{border: 'none', backgroundColor: '#FA696D', color: '#f9f9f9'}}
                attached="top"
                secondary
                inverted
                size='small'
            >
                {attendees.length} {attendees.length > 1 ? 'People' : 'Person'} Attending
            </Segment>
            <Segment attached>
                <Item.Group relaxed divided>
                    {attendees.map(attendee => (
                        <Item as={Link} to={`/profile/${attendee.id}`} key={attendee.id} style={{position: 'relative'}}>
                            {hostUid === attendee.id && (
                                <Label style={{position: 'absolute', backgroundColor: '#FA696D', color: "#f9f9f9"}} ribbon='right' content='Host' />
                            )} 
                            <Item.Image size="tiny" src={attendee.photoURL || '/assets/user.png'} />
                            <Item.Content verticalAlign="middle">
                                <Item.Header as="h6">
                                    <span>{attendee.displayName}</span>
                                </Item.Header>
                            </Item.Content>
                        </Item>
                    ))}
                </Item.Group>
            </Segment>
        </>
    )
}