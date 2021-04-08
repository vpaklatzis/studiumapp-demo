import React from 'react';
import { Button, Divider, Grid, Header, Item, Reveal, Segment, Statistic } from 'semantic-ui-react';

export default function ProfileHeader({ profile, isCurrentUser }) {
    return (
        <Segment>
            <Grid>
                <Grid.Column width={12}>
                    <Item.Group>
                        <Item>
                            <Item.Image avatar size='small' src={profile.photoURL || '/assets/user.png'} />
                            <Item.Content verticalAlign='middle'>
                                <Header as='h2' style={{display: 'block', marginBottom: 10}} content={profile.displayName} />
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Grid.Column>
                <Grid.Column width={4}>
                    <Statistic.Group>
                        <Statistic label='Followers' value={10} />
                        <Statistic label='Following' value={5} />
                    </Statistic.Group>
                    {!isCurrentUser &&
                        <>
                            <Divider />
                            <Reveal animated='move'>
                                <Reveal.Content visible style={{width: '100%'}}>
                                    <Button fluid style={{backgroundColor: '#FA696D', color: '#f9f9f9'}} content='Following' />
                                </Reveal.Content>
                                <Reveal.Content hidden style={{width: '100%'}}>
                                    <Button fluid content='Unfollow' />
                                </Reveal.Content>
                            </Reveal>
                        </>
                    }
                </Grid.Column>
            </Grid>
        </Segment>
    )
}