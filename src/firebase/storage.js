import { getDownloadURL, ref, uploadBytes, uploadString } from "firebase/storage";
import { storage } from "./config";
import { generateUniqueID } from "./message.firestore"

async function storeFileInCloud(file){
    const uniqueID = generateUniqueID();

    const imageRef = `images/${uniqueID}.${file.type.split('/')[1]}`

    const storageRef = ref(storage, imageRef);

    await uploadBytes(storageRef, file);

    return imageRef;
}

async function getFileFromCloud(imagePath){
    const storageRef = ref(storage, imagePath);
    const url = await getDownloadURL(storageRef);
    return url;
}

async function storeDataUrlImage(image,type){
    const uniqueID = generateUniqueID();
    const imageRef = `images/${uniqueID}.${type.split('/')[1]}`
    const storageRef = ref(storage, imageRef);
    await uploadString(storageRef, image, 'data_url');
    
    return imageRef;
}


export {storeFileInCloud, getFileFromCloud,storeDataUrlImage};