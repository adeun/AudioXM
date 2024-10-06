// Import the functions you need from the SDKs you need
import { initializeApp, FirebaseError } from "firebase/app";
import { getStorage, ref, uploadString, deleteObject, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';

// Firebase configuration
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

// Initialize Storage
const storage = getStorage(app);

// Helper function to create a reference in the storage bucket
const createStorageRef = (folderName: string, uuidName: string) => ref(storage, `${folderName}/${uuidName}`);

// Function to upload a base64-encoded string to Firebase Storage
export async function uploadBase64(path: string, folderName: "AudioFileStorage" | "ImageFileStorage" |"ProfileImage") {
     let newName = uuidv4();
     console.log("Uploading base64 file in Firebase");

     const storageRef = createStorageRef(folderName, newName);

     return new Promise<{ url: string; id: string }>(async (resolve, reject) => {
          uploadString(storageRef, path, 'data_url').then((snapshot) => {
               console.log(`Uploaded a data_url string to ${folderName}!`);
               // Get the download URL after the upload

               try {
                    getDownloadURL(snapshot.ref).then((downloadURL) => {
                         resolve({
                              url: downloadURL,
                              id: snapshot.ref.name
                         }); 
                         console.log(`Download complete successfully downloaded from ${snapshot.ref.name} to ${folderName}!`);
                         

                    }).catch((error) =>{
                         console.error("Error fetching download URL: ", error);
                         reject(new Error(`Failed to get download URL: ${error.message}`));
                    })


               } catch (error) {
                    console.error("Error fetching download URL: ", error);
                    reject(new Error(`Failed to get download URL: ${error}`));
               }

          }).catch((error: FirebaseError) => {
               handleFirebaseError(error, folderName);
               reject(new Error(`Upload failed for ${folderName}: ${error.message} at FirebaseSDK.ts`));
          });
     });
}

// Function to delete a file from Firebase Storage
export function Delete(folderName: "AudioFileStorage" | "ImageFileStorage", file: string) {
     const desertRef = ref(storage, `${folderName}/${file}`);
     return new Promise<boolean>((resolve, reject) => {
          deleteObject(desertRef).then(() => {
               console.log(`File ${file} deleted from ${folderName}`);
               resolve(true);
          }).catch((error: FirebaseError) => {
               handleFirebaseError(error, folderName);
               reject(new Error(`Delete failed for ${folderName}: ${error.message}`));
          });
     });
}

// Helper function to handle Firebase errors
function handleFirebaseError(error: FirebaseError, folderName: string) {
     switch (error.code) {
          // case 'storage/unauthorized':
          //      console.error(`User does not have permission to access the object in ${folderName}.`);
          //      break;
          case 'storage/canceled':
               console.error(`User canceled the upload/delete operation in ${folderName}.`);
               break;
          case 'storage/unknown':
               console.error(`Unknown error occurred in ${folderName}: ${error.message}`);
               break;
          default:
               console.error(`An error occurred in ${folderName}: ${error.message}`);
     }
}
