// Import the functions you need from the SDKs you need
import { initializeApp, FirebaseError  } from "firebase/app";
import { getStorage, ref, uploadString  ,deleteObject} from "firebase/storage";
import {v4 as uuidv4} from 'uuid';

import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
     apiKey: "AIzaSyCAdI9k2DjrRhPOmKywaG7h4ZCeFeEzCRo",
     authDomain: "augx-8b4dd.firebaseapp.com",
     projectId: "augx-8b4dd",
     storageBucket: "augx-8b4dd.appspot.com",
     messagingSenderId: "39540552000",
     appId: "1:39540552000:web:917b073301c7623f218aa5",
     measurementId: "G-GEE4QM9Q5M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const storage = getStorage();
const createStorageRef = (folderName: string ,uuuidNmae:string) => ref(storage, `${folderName}/&${uuuidNmae}`);





export async function uploadBase64(path: string, folderName: "AudioFileStorage" | "ImageFileStorage") {
     let newName = uuidv4();

     const storageRef = createStorageRef(folderName ,newName );

     return new Promise<{url:string , id:string}>((resolve, reject) => {
          uploadString(storageRef, path, 'data_url').then((snapshot) => {
               console.log(`Uploaded a data_url string to ${folderName}!`);
               resolve({
                    url: snapshot.metadata.fullPath,
                    id: snapshot.ref.name
               });
          }).catch((error: FirebaseError) => {
               switch (error.code) {
                    case 'storage/unauthorized':
                         console.error('User does not have permission to access the object.');
                         break;
                    case 'storage/canceled':
                         console.error('User canceled the upload.');
                         break;
                    case 'storage/unknown':
                         console.error('Unknown error occurred:', error.message);
                         break;
                    default:
                         console.error('An error occurred:', error.message);
               }
               reject(new Error(`Upload failed for ${folderName}: ${error.message}`));
          })

     })

}

export function Delete( folderName: "AudioFileStorage" | "ImageFileStorage" , file:string ){
     const desertRef = ref(storage, `${folderName}/${file}`);
     return new Promise<boolean>((resolve, reject) => {
          deleteObject(desertRef).then(() => {
               console.log(`File ${file} deleted from ${folderName}`);
               resolve(true);
          }).catch((error:FirebaseError) => {
               switch (error.code) {
                    case 'storage/unauthorized':
                         console.error('User does not have permission to access the object.');
                         break;
                    case 'storage/canceled':
                         console.error('User canceled the upload.');
                         break;
                    case 'storage/unknown':
                         console.error('Unknown error occurred:', error.message);
                         break;
                    default:
                         console.error('An error occurred:', error.message);
               }
               reject(new Error(`Upload failed for ${folderName}: ${error.message}`));
          })
     })

}



