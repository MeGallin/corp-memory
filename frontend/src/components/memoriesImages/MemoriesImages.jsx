import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './MemoriesImages.scss';

import { memoryImageUploadAction } from '../../store/actions/imageUploadAction';

import InputFieldComponent from '../inputField/inputFieldComponent';
import LoadingComponent from '../../components/loadingComponent/LoadingComponent';

const MemoriesImages = ({ memoryId, memoryImage }) => {
  const dispatch = useDispatch();

  const memoryImageUpload = useSelector((state) => state.memoryImageUpload);
  const { error, loading, success } = memoryImageUpload;

  const [previewImage, setPreviewImage] = useState('');
  const [previewImageFile, setPreviewImageFile] = useState('');

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
  };

  const uploadFileHandler = (e) => {
    const imageFile = e.target.files[0];
    setPreviewImageFile(imageFile);
    previewFile(imageFile);
  };

  const handelCancelUpload = () => {
    document.getElementById('memoryImage').value = '';
    setPreviewImage('');
  };

  const handleImageUpdate = (e) => {
    e.preventDefault();
    const formImageData = new FormData();
    formImageData.append('memoryImage', previewImageFile);

    // Dispatch Profile image upload Action
    dispatch(memoryImageUploadAction(memoryId, formImageData));
    setPreviewImage('');
  };

  return (
    <div className="memories-images-wrapper">
      {error ? error : null}
      {loading ? (
        <LoadingComponent />
      ) : (
        <>
          <img src={memoryImage} alt="" className="preview-image" />
          <form onSubmit={handleImageUpdate}>
            <InputFieldComponent
              id="memoryImage"
              label="Change Profile Image"
              type="file"
              name="memoryImage"
              onChange={uploadFileHandler}
            />

            {previewImage ? (
              <>
                Image Preview
                <img
                  src={previewImage}
                  alt="profile preview"
                  className="preview-image"
                />
                <button type="submit">I Like It</button>
                <button type="button" onClick={handelCancelUpload}>
                  Cancel
                </button>
              </>
            ) : null}
          </form>
        </>
      )}
    </div>
  );
};

export default MemoriesImages;
