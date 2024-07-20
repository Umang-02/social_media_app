import React, { useState } from 'react'
import useShowToast from './useShowToast';

const usePreviewImage = () => {
    const [imgUrl,setImgUrl]=useState(null);
    const showToast=useShowToast();
    const handleImageChange=(e)=>{
        const file=e.target.files[0];
        if(file && file.type.startsWith("image/"))
        {
            const reader=new FileReader();
            //FileReader is a JS API which offers several file reading methods. It is used to view a file's content.
            
            //File reader can only view the chosen files through either drap and drop or a file input only.

            reader.onloadend=()=>{
                //console.log(reader.result);
                setImgUrl(reader.result);
            }

            reader.readAsDataURL(file); //this is going to read the file and convert it into a base64 string and then we will be able to render using the string.
        }
        else
        {
            showToast("Invalid file type","Please select an image file","error");
            setImgUrl(null);
        }
        console.log(file);
        console.log(imgUrl);
    };
  return {handleImageChange,imgUrl,setImgUrl};
}

export default usePreviewImage
