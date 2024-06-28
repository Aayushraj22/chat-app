import React, { useEffect, useState, useRef } from 'react'
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
        prevSavedImgurl : ''
    })
    const [userGeneralField, setUserGeneralField] = useState([])
    const [successUpload , setSuccessUpload] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const refFileInput = useRef();
    console.log('imgdata : ',imgData)


    const handleToClickImage = () => {
        const inputFile = refFileInput.current;
        inputFile.click();
    }

    const handleToChangeImage = (e) => {
        alert('file selected')
        const image = e.target?.files[0];
        if(!image)
            return;
        
        const type = image.type;

        // creating an imageUrl in base64 format
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = () => {
            setImgData({
                ...imgData,
                imgurl: reader.result,
                type: type,
            });
        }
    }

    const handleToRemoveImage = async() => { 
        const inputFile = refFileInput;
        inputFile.value = '';
        setImgData({
            ...imgData,
            imgurl: '',
            type: '',
        })
    }

    const handleToUpdateImage = async() => {
        alert('called upload method')
        if(!refFileInput.current.value){
            alert('nothing selected from local machine')
            return;
        }
        try {
            setIsLoading(true);
            alert('imgUrl : ', imgData.imgurl, ' type : ',imgData.type)
            const imageRef = await storeDataUrlImage(imgData.imgurl, imgData.type);
            const url = await getFileFromCloud(imageRef);
            alert('imageRef: ',url)
            await updateUserDocField('imgurl', localStorage.getItem('userID'), url);
            setImgData({
                prevSavedImgurl: url,
                imgurl: url,
                type: '',
            });
            alert(`successfull save image : ${imgData.imgurl}`)
            setSuccessUpload(true)
        } catch (error) {
            alert(`failed save image : ${imgData.imgurl}`)
        } finally{
            setIsLoading(false)
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
            prevSavedImgurl: data.imgurl,
        });
        setIsLoading(false)
    })
    }, [])
    


  return (
    <div className='editUserContainer'>
        {isLoading && <Loader />}
        <div className="userImgContainer">
            <div className="imgContainer">
                <img src={imgData.imgurl || imgData.prevSavedImgurl || "https://banner2.cleanpng.com/20180627/wio/kisspng-computer-icons-user-profile-avatar-jain-icon-5b332c5add9336.0201786915300803469076.jpg"} alt="" />
                
                <div className="editIconAndFileInput" onClick={handleToClickImage} title='Change Profile Image'>
                    <MdCloudUpload color='white' size='40px'/>
                    <input ref={refFileInput} type="file" name="" onChange={handleToChangeImage}/>
                </div>
            </div>
            <div className="btnContainer">
                <CustomButton buttonWidth='80px' onClick={handleToUpdateImage}>Update</CustomButton>
                <CustomButton buttonWidth='80px' bgColor='redBG' onClick={handleToRemoveImage} title='remove image'>Remove</CustomButton>
            </div>
            {successUpload  && <p style={{color:'green', textTransform: 'capitalize', fontSize: '12px' }}>Successfully changed Image</p>}
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