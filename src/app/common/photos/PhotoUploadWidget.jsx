import cuid from 'cuid';
import React, {useState} from 'react';
import { Button, Grid, Header } from 'semantic-ui-react';
import { getFileExtension } from '../util/util';
import PhotoWidgetCropper from './PhotoWidgetCropper';
import PhotoWidgetDropzone from './PhotoWidgetDropzone';
import { uploadToFirebaseStorage } from '../../firestore/firebaseService';
import { toast } from 'react-toastify';
import { updateUserProfilePhoto } from '../../firestore/firestoreService';

export default function PhotoUploadWidget({setEditMode}) {

    const [files, setFiles] = useState([]);
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    function handleUploadImage() {
        setLoading(true);
        const filename = cuid() + '.' + getFileExtension(files[0].name);
        const uploadTask = uploadToFirebaseStorage(image, filename);
        uploadTask.on('state_changed', snapshot => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
        }, error => {
            toast.error(error.message);
        }, () => {
            uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
                updateUserProfilePhoto(downloadURL, filename).then(() => {
                    setLoading(false);
                    handleCancelCrop();
                    setEditMode(false);
                }).catch(error => {
                    toast.error(error.message);
                    setLoading(false);
                });
            })
        })
    }

    function handleCancelCrop() {
        setFiles([]);
        setImage(null);
    }

    return (
        <Grid>
            <Grid.Column width={4}>
                <Header style={{color: '#FA696D'}} sub content='Add Photo' />
                <PhotoWidgetDropzone setFiles={setFiles} />
            </Grid.Column>
            <Grid.Column width={1} />
            <Grid.Column width={4}>
                <Header style={{color: '#FA696D'}} sub content='Resize' />
                {files.length > 0 &&
                    <PhotoWidgetCropper setImage={setImage} imagePreview={files[0].preview} />
                }
            </Grid.Column>
            <Grid.Column width={1} />
            <Grid.Column width={4}>
                <Header style={{color: '#FA696D'}} sub content='Preview' />
                {files.length > 0 &&
                    <>
                        <div className='img-preview' style={{minHeight: 200, minWidth:200, overflow: 'hidden'}} />
                        <Button.Group>
                            <Button loading={loading} onClick={handleUploadImage} icon='check' style={{backgroundColor: '#FA696D', color: '#f9f9f9'}} />
                            <Button disabled={loading} onClick={handleCancelCrop} icon='close' />
                        </Button.Group>
                    </>
                }
            </Grid.Column>
        </Grid>
    )
}