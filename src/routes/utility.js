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

    return { updateUserData, getUserData }
}

function validateUserFormData(formData){
    // checking email and password are present 
    const {email,password} = formData;

    if(!email || !password)
        return;

    // formData of signup form must have username
    if(formData.username === undefined)  // means current formData is of signin form
        return true;

    if(!formData.username)
        return;

    return true;
}

export { userAuthenticationForm, validateUserFormData}