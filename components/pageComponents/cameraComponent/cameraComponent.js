import { useAtom } from 'jotai';
import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';
import { capturedImagee } from '../../atom/store';

const CameraComponent = () => {
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useAtom(capturedImagee);
  const [cameraActive, setCameraActive] = useState(true);
  const cloudinaryCloudName = 'dmjzk4esn';
  const cloudinaryUploadPreset = 'ImageMoto';
//  const cloudinaryApiKey = '129629451734981';
//   const cloudinaryApiSecret = 'rfi8Hh0CX3mkFtDjquGOBMXQorg';
  const capturePhoto = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
    uploadImageToCloudinary(imageSrc);
    setTimeout(() => {
      setCapturedImage(null);
    }, 3000);
    console.log("im", imageSrc)
  };

  const uploadImageToCloudinary = async (imageData) => {
    const formData = new FormData();
    formData.append('file', imageData);
    formData.append('upload_preset', cloudinaryUploadPreset);
    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudinaryCloudName}/image/upload`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          // auth: {
          //   username: cloudinaryApiKey,
          //   password: cloudinaryApiSecret,
          // },
        }
      );

      console.log('Image uploaded successfully:', response.data.secure_url);
      // Lưu URL của ảnh vào cơ sở dữ liệu hoặc xử lý phản hồi khác tùy ý
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}
      >
        {cameraActive && (
          <div style={{ width: '90%', height: '90%' }}>
            <Webcam
              audio={false}
              ref={webcamRef}
              videoSource="usb" // Chỉ định sử dụng webcam cắm qua cổng USB
              style={{ width: '100%', height: '100%', transform: 'scaleX(-1)' }}
            />
          </div>
        )}
      </div>
      {cameraActive && <button onClick={capturePhoto}>Chụp ảnh</button>}
    </>
  );
};

export default CameraComponent;
