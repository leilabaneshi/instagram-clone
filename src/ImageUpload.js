import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import firebase from 'firebase'
import { db, storage } from './firebase';





function ImageUpload({ username }) {
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState('0');
    const [caption, setCaption] = useState('');


    const handleChange = (event) => {
        if (event.target.files[0]) {
            console.log(event.target.value)
            setImage(event.target.files[0]);
        }
    };

    const handleUpload = () => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                console.log(snapshot)
                //progress function
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress);
            },
            (error) => {
                //error function
                console.log(error);
                alert(error.message);
            },
            () => {
                // complete function...  
                storage
                    .ref('images')
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        //post image inside db
                        db.collection('post').add({
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            caption: caption,
                            imageUrl: url,
                            username: username

                        });


                        setProgress(0);
                        setCaption('');
                        setImage(null);

                    });
            }

        )
    }



    return (
        <div>

            <progress value={progress} max='100' />
            <input type="text"
                placeholder='write a caption...'
                onChange={event => setCaption(event.target.value)}
                value={caption} />

            <input type="file"
                onChange={handleChange} />

            <Button onClick={handleUpload}>
                Upload
             </Button>
        </div>
    )
}

export default ImageUpload
