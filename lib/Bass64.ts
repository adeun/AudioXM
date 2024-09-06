import { v4 as uuidv4 } from 'uuid';
import { FileDetails, ToAudioDetails } from './type';

function formatFileSize(bytes: number): string {
     if (bytes >= 1073741824) {
       return (bytes / 1073741824).toFixed(2) + ' GB';
     } else if (bytes >= 1048576) {
       return (bytes / 1048576).toFixed(2) + ' MB';
     } else if (bytes >= 1024) {
       return (bytes / 1024).toFixed(2) + ' KB';
     } else {
       return bytes + ' Bytes';
     }
   }





export function toAudioAsBase64(file: File): Promise<ToAudioDetails> {
     return new Promise<ToAudioDetails>((resolve, reject) => {
          const reader = new FileReader();
          const audio = new Audio();
          const objectUrl = URL.createObjectURL(file);
          audio.src = objectUrl;


          audio.onloadedmetadata = () => {
               reader.readAsDataURL(file); // Now that the metadata is loaded, we can read the file as Base64
               reader.onload = () => {
                    const uuid = uuidv4();
                    if (reader.result) {
                         const buffer: ToAudioDetails = {
                              path: reader.result as string,
                              name: file.name,
                              type: file.type,
                              size: formatFileSize(file.size),
                              id: uuid,
                              duration: audio.duration, // Fetch the audio duration
                         };
                         resolve(buffer);
                         // Clean up
                         URL.revokeObjectURL(objectUrl);

                    } else {
                         reject('Failed to convert audio to Base64');
                    }

               };


          }

          reader.onerror = (error) => reject(error);
          audio.onerror = (error) => {
               URL.revokeObjectURL(objectUrl); // Clean up on error
               reject('Failed to load audio metadata');
          };
     });
}



export function toFileAsBase64(file: File): Promise<FileDetails> {
     return new Promise<FileDetails>((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          if (!file) {
               return reject(new Error("No file provided"));
          }

          reader.onload = () => {
               const uuid = uuidv4();
               const buffer: FileDetails = {
                    path: reader.result as string,
                    name: file.name,
                    type: file.type,
                    size: formatFileSize(file.size),
                    id: uuid
               };
               console.log("buffer", buffer);

               resolve(buffer);
          };

          reader.onerror = (error) => reject(error);
     });
}
export function toAudioAsBase64Z(file: File): Promise<string> {
     return new Promise<string>((resolve, reject) => {
          const reader = new FileReader();

          reader.readAsDataURL(file);

          reader.onload = () => {
               if (reader.result) {
                    resolve(reader.result as string);
               } else {
                    reject("File could not be read");
               }
          };

          reader.onerror = (error) => reject(`Error reading file: ${error}`);
     });
}
