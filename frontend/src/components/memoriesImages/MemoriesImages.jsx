import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './MemoriesImages.scss';

import {
  memoryImageUploadAction,
  deleteMemoryImageAction,
} from '../../store/actions/imageUploadAction';

import InputFieldComponent from '../inputField/inputFieldComponent';
import LoadingComponent from '../../components/loadingComponent/LoadingComponent';

import { FaTrash, FaPencilAlt } from 'react-icons/fa';

const MemoriesImages = ({ memoryId, memoryImage }) => {
  const dispatch = useDispatch();

  const memoryImageUpload = useSelector((state) => state.memoryImageUpload);
  const { error, loading } = memoryImageUpload;

  const [previewImage, setPreviewImage] = useState('');
  const [previewImageFile, setPreviewImageFile] = useState('');
  const [showHideInput, setShowHideInput] = useState(false);

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
    document.querySelectorAll('[name="memoryImage"]').value = '';
    // document.getElementById('memoryImage').value = null;
    setPreviewImage('');
    setShowHideInput(false);
  };

  const handleImageUpdate = (e) => {
    e.preventDefault();
    const formImageData = new FormData();
    formImageData.append('memoryImage', previewImageFile);

    // Dispatch Profile image upload Action
    dispatch(memoryImageUploadAction(memoryId, formImageData));
    setPreviewImage('');
  };

  const handleImageDelete = (id) => {
    if (window.confirm(`Are you sure you want to delete ${id}`)) {
      // Dispatch delete Image Action
      dispatch(deleteMemoryImageAction(id));
    }
  };

  return (
    <div className="memories-images-wrapper">
      {error ? error : null}
      {loading ? (
        <LoadingComponent />
      ) : (
        <>
          <form onSubmit={handleImageUpdate}>
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
            ) : (
              <div className="image-wrapper">
                {memoryImage ? (
                  <>
                    <span
                      className="trash"
                      onClick={() => handleImageDelete(memoryId)}
                    >
                      <FaTrash size={22} title="Delete this Image" />
                    </span>
                    <img src={memoryImage} alt="" className="preview-image" />
                    <span
                      className="edit"
                      onClick={() => setShowHideInput(!showHideInput)}
                    >
                      <FaPencilAlt size={22} title="EDIT this Image" />
                    </span>
                  </>
                ) : null}
              </div>
            )}
            {!previewImage && !memoryImage ? (
              <InputFieldComponent
                id="memoryImage"
                // label={memoryImage ? 'Change Image' : 'Add Image'}
                type="file"
                name="memoryImage"
                onChange={uploadFileHandler}
              />
            ) : null}
            {showHideInput ? (
              <InputFieldComponent
                id="memoryImage"
                // label={memoryImage ? 'Change Image' : 'Add Image'}
                type="file"
                name="memoryImage"
                onChange={uploadFileHandler}
              />
            ) : null}
          </form>
        </>
      )}
    </div>
  );
};

export default MemoriesImages;
