import React, { useState } from 'react';
import { Card, Grid, Header, Image, Tab } from 'semantic-ui-react';
import {format} from 'date-fns';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import useFirestoreCollection from '../../../app/hooks/useFirestoreCollection';
import { getUserEventsQuery } from '../../../app/firestore/firestoreService';
import { listenToUserEvents } from '../profileActions';

export default function EventsTab({ profile }) {

    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState(0);
    const {profileEvents} = useSelector((state) => state.profile);
    const { loading } = useSelector((state) => state.async);
    const panes = [
        {menuItem: 'Future Posts', pane: {key: 'future'}},
        {menuItem: 'Past Posts', pane: {key: 'past'}},
        {menuItem: 'Hosting', pane: {key: 'hosting'}},
    ]

    useFirestoreCollection({
        query: () => getUserEventsQuery(activeTab, profile.id),
        data: events => dispatch(listenToUserEvents(events)),
        deps: [dispatch, activeTab, profile.id]
    })

    return (
        <Tab.Pane loading={loading}>
            <Grid>
                <Grid.Column width={16}>
                    <Header floated='left' icon='calendar' content='Posts' />
                </Grid.Column>
                <Grid.Column width={16}>
                    <Tab 
                        onTabChange={(e, data) => setActiveTab(data.activeIndex)}
                        panes={panes}
                        menu={{secondary: true, pointing: true}}
                    />
                    <Card.Group itemsPerRow={5} style={{marginTop: 10}}>
                        {profileEvents.map(event => (
                            <Card as={Link} to={`/events/${event.id}`} key={event.id}>
                                <Image 
                                    src={`/assets/categoryImages/${event.category}.jpg`} 
                                    style={{minHeight: 100, objectFit: 'cover'}}
                                />
                                <Card.Content>
                                    <Card.Header content={event.title} textAlign='center' />
                                    <Card.Meta textAlign='center'>
                                        <div>{format(event.date, 'dd MMM yyyy')}</div>
                                        <div>{format(event.date, 'hh:mm a')}</div>
                                    </Card.Meta>
                                </Card.Content>
                            </Card>
                        ))}
                    </Card.Group>
                </Grid.Column>
            </Grid>
        </Tab.Pane>
    )
}