import React from 'react';
import { Grid, Icon, Segment } from 'semantic-ui-react';
import { format } from 'date-fns';

export default function EventDetailedInfo({event}) {
    return (
        <Segment.Group>
            <Segment attached="top">
                <Grid>
                    <Grid.Column width={1}>
                        <Icon size="large" style={{color: '#FA696d'}} name="info" />
                    </Grid.Column>
                    <Grid.Column width={15}>
                        <p>{event.description}</p>
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment attached>
                <Grid verticalAlign="middle">
                    <Grid.Column width={1}>
                        <Icon name="calendar" style={{color: '#FA696d'}} size="large" />
                    </Grid.Column>
                    <Grid.Column width={15}>
                        <span>{format(event.date, 'MMMM d, yyyy h:mm a')}</span>
                    </Grid.Column>
                </Grid>
            </Segment>
        </Segment.Group>
    )
}