import React, { useState } from 'react';
import { Button, Card, Grid, Header, Image, Tab } from 'semantic-ui-react';
import PhotoUploadWidget from '../../../app/common/photos/PhotoUploadWidget';

export default function PhotosTab({ profile, isCurrentUser }) {

    const [editMode, setEditMode] = useState(true);

    return (
        <Tab.Pane>
            <Grid>
                <Grid.Column width={16}>
                    <Header floated='left' icon='user' content={`Photos`} />
                    {isCurrentUser && 
                        <Button onClick={() => setEditMode(!editMode)} floated='right' content={editMode ? 'Cancel' : 'Change Photo'} />
                    }
                        </Grid.Column>
                <Grid.Column width={16}>
                    {editMode ? (
                       <PhotoUploadWidget />
                    ) : (
                        <Card.Group itemsPerRow={5}>
                            <Card>
                                <Image src={'/assets/user.png'} />
                                <Button.Group fluid widths={2}>
                                    <Button content='Main' style={{backgroundColor: '#FA696D', color: '#f9f9f9'}} />
                                    <Button icon='trash' />
                                </Button.Group>
                            </Card>
                        </Card.Group>
                    )}
                </Grid.Column>
            </Grid>
        </Tab.Pane>
    )
}