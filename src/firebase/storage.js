import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "./config";
import { generateUniqueID } from "./message.firestore"

function storeFileInCloud(file){
    const uniqueID = generateUniqueID();

    const imageRef = `images/${uniqueID}.${file.type.split('/')[1]}`

    const storageRef = ref(storage, imageRef);

    uploadBytes(storageRef, file).then(() => {});

    return imageRef;
}

async function getFileFromCloud(imagePath){
    const storageRef = ref(storage, imagePath);
    const url = await getDownloadURL(storageRef);
    return url;
}


export {storeFileInCloud, getFileFromCloud};