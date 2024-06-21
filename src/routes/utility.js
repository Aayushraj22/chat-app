import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from '../firebase/config';
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth'

// structure of signin and signup form data and assosicated method with them
function userAuthenticationForm(formType) {
    // default signin form structure.
    const formData = {
        email: '',
        password: '',
    }

    if (formType === 'signup') {
        formData.username = '';
        formData.imgurl = '';
    }

    function updateUserData(key, value) {
        formData[key] = value;
    }

    function getUserData() {
        return formData;
    }

    function resetUserData(){
        return formType ? {
            email: '',
            password: '',
            username: '',
            imgurl: '',
        }:
        {
            email: '',
            password: '',
        }
    }

    return { updateUserData, getUserData, resetUserData }
}

function validateUserFormData(formData){
    // checking email and password are present 
    const {email,password} = formData;

    if(!email || !password)
        return false;

    //password should be >= 6 character
    if(password.length < 6)
        return false;

    // formData of signup form must have username
    if(formData.username === undefined)  // means current formData is of signin form
        return true;

    if(!formData.username)
        return false;

    return true;
}


async function signupUser(formData){
    const {email, password, username, imgurl} = formData;
    
    try {
        const userCredential = await createUserWithEmailAndPassword(auth,email,password);
        const uid = userCredential.user.uid;
        await addDoc(collection(db, 'users'), {
            authId: uid,
            email,
            password,
            username,
            imgurl,
            chat: {},
        })

    } catch (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert('error : ',errorCode)
    }
}

async function signinUser(formData){
    const {email, password} = formData;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const uid = userCredential.user.uid;

        const querySnapshots = await getDocs(query(collection(db, 'users'), where('authId','==',uid)));
        if(querySnapshots.size === 1){
            querySnapshots.forEach((doc) => {
                localStorage.setItem('userID', doc.id);
            })
        }
    } catch (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert('error : ',errorCode)
    }
}

function signout(){
    localStorage.removeItem('userID');
    window.location.reload()
}


export { userAuthenticationForm, validateUserFormData, signupUser, signinUser, signout}