import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import ProfileContent from './ProfileContent';
import ProfileHeader from './ProfileHeader';
import useFirestoreDoc from '../../../app/hooks/useFirestoreDoc';
import { getUserProfile } from '../../../app/firestore/firestoreService';
import { listenToSelectedUserProfile } from '../profileActions';
import LoadingComponent from '../../../app/layout/LoadingComponent';

export default function ProfilePage({match}) {

    const dispatch = useDispatch();
    const { selectedUserProfile } = useSelector((state) => state.profile);
    const {currentUser} = useSelector((state) => state.auth);
    const { loading, error } = useSelector((state) => state.async);

    useFirestoreDoc({
        query: () => getUserProfile(match.params.id),
        data: profile => dispatch(listenToSelectedUserProfile(profile)),
        deps: [dispatch, match.params.id]
    })

    if ((loading && !selectedUserProfile) || (!selectedUserProfile && !error)) return <LoadingComponent content='' />;

    return (
        <Grid>
            <Grid.Column width={16}>
                <ProfileHeader 
                    profile={selectedUserProfile} 
                    isCurrentUser={currentUser.uid === selectedUserProfile.id} 
                />
                <ProfileContent 
                    profile={selectedUserProfile} 
                    isCurrentUser={currentUser.uid === selectedUserProfile.id} 
                />
            </Grid.Column>
        </Grid>
    )
}