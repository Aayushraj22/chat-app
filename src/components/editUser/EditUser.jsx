import React, { useEffect, useState } from 'react'
import { MdCloudUpload } from "react-icons/md";

import './editUser.styles.css'
import CustomButton from '../customButton/CustomButton';
import EditUserField from '../editUserField/EditUserField';
import { getUser, updateUserDocField } from '../../firebase/user.firestore';
import { getFileFromCloud, storeDataUrlImage } from '../../firebase/storage';
import Loader from '../loader/Loader';

function EditUser() {

    const [imgData, setImgData] = useState({
        imgurl: '',
        type: '',
    })
    const [userGeneralField, setUserGeneralField] = useState([])
    const [canSave, setCanSave] = useState(false);
    const [isLoading, setIsLoading] = useState(false)


    const handleToClickImage = () => {
        const imgEle = document.querySelector('#userImg');
        imgEle.click();
    }

    const handleToChangeImage = (e) => {
        const image = e.target?.files[0];
        const type = image.type;
        if(!image)
            return;

        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = () => {
            setImgData({
                imgurl: reader.result,
                type: type,
            });
        }
        setCanSave(true);
    }

    const handleToRemoveImage = async() => {
        const imgEle = document.querySelector('#userImg');
        imgEle.value = '';
        setImgData({
            imgurl: '',
            type: '',
        })
        setCanSave(false);
    }

    const handleToSaveImage = async() => {
        try {
            setIsLoading(true);
            const imageRef = await storeDataUrlImage(imgData.imgurl, imgData.type);
            const url = await getFileFromCloud(imageRef);
            await updateUserDocField('imgurl', localStorage.getItem('userID'), url);
            setImgData({
                imgurl: url,
                type: '',
            });
            setCanSave(false);
            setIsLoading(false);
        } catch (error) {
            setCanSave(false)
            setIsLoading(false);
        }
    } 


    useEffect(() => {
        setIsLoading(true);
        getUser(localStorage.getItem('userID')).then((data) => {setUserGeneralField([
            {
                key: 'username',
                value: data.username,
            }
        ]);
        setImgData({
            imgurl: data.imgurl,
            type: '',
        });
        setIsLoading(false)
    })
    }, [])
    


  return (
    <div className='editUserContainer'>
        {isLoading && <Loader />}
        <div className="userImgContainer">
            <div className="imgContainer">
                <img src={imgData.imgurl || "https://banner2.cleanpng.com/20180627/wio/kisspng-computer-icons-user-profile-avatar-jain-icon-5b332c5add9336.0201786915300803469076.jpg"} alt="" />

                <div className="editIconAndFileInput" onClick={handleToClickImage} title='Change Profile Image'>
                    <MdCloudUpload color='white' size='40px'/>
                    <input type="file" name="" id='userImg' onInput={handleToChangeImage}/>
                </div>
            </div>
            <div className="btnContainer">
                <CustomButton buttonWidth='80px' onClick={canSave ? handleToSaveImage : handleToClickImage}>{canSave ? 'Save' : 'Edit'}</CustomButton>
                <CustomButton buttonWidth='80px' bgColor='redBG' onClick={handleToRemoveImage}>Remove</CustomButton>
            </div>
        </div>
        <div className="otherDetailContainer">
            {userGeneralField?.map(({key,value}) => 
                <EditUserField fieldname={key} value={value} key={key}/>
            )}
        </div>
    </div>
  )
}

export default EditUser