import { useAtom } from 'jotai';
import React, { useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { capturedImagee } from '../../atom/store';

const  CameraComponent = () => {
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useAtom(capturedImagee);
  const [cameraActive, setCameraActive] = useState(true);

  const capturePhoto = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
  };
  // useEffect(() => {
  //   const handleKeyDown = (event) => {
  //     // Kiểm tra nếu camera đã tắt và người dùng nhấn bất kỳ phím nào trên bàn phím
  //     if (!cameraActive && event.key) {
  //       setCameraActive(true);
  //       setCapturedImage(null);
  //     }
  //   };

  //   // Đăng ký sự kiện lắng nghe nhấn phím
  //   document.addEventListener('keydown', handleKeyDown);

  //   // Hủy đăng ký sự kiện khi component unmount
  //   return () => {
  //     document.removeEventListener('keydown', handleKeyDown);
  //   };
  // }, [cameraActive]);
  return (
    <>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
      {cameraActive && (
        <div style={{ width: '90%', height: '90%' }}>
          <Webcam
            audio={false}
            ref={webcamRef}
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      )}
        </div>
      {cameraActive && (
        <button onClick={capturePhoto}>Chụp ảnh</button>
      )}
      </>
  );
};

export default CameraComponent;
