import React from 'react';
import Resizer from 'react-image-file-resizer';
import axios from 'axios';
import { AuthContext } from '../context/authContext';
import Image from './Image';

const FileUpload = ({ setLState, ls_images = [] }) => {
  const {
    state: { user },
  } = React.useContext(AuthContext);

  const fileResizeAndUpload = (e) => {
    let fileInput = false;
    if (e.target.files[0]) fileInput = true;
    if (fileInput) {
      setLState((cs) => ({ ...cs, loading: true }));
      Resizer.imageFileResizer(
        e.target.files[0],
        300,
        300,
        'JPEG',
        100,
        0,
        async (uri) => {
          try {
            const { data } = await axios.post(
              `${process.env.REACT_APP_REST_ENDPOINT}/uploadimages`,
              {
                image: uri,
              },
              {
                headers: {
                  authtoken: user.token,
                },
              }
            );
            setLState((cs) => ({
              ...cs,
              ls_images: [...ls_images, data],
              loading: false,
            }));
          } catch (e) {
            setLState((cs) => ({ ...cs, loading: false }));
            console.log('> Cloudinary upload failed ', e);
          }
        },
        'base64'
      );
    }
  };

  const handleImageRemoval = async (id = '') => {
    setLState((cs) => ({ ...cs, loading: true }));
    try {
      await axios.post(
        `${process.env.REACT_APP_REST_ENDPOINT}/removeimage`,
        { public_id: id },
        { headers: { authtoken: user.token } }
      );
      setLState((cs) => ({
        ...cs,
        ls_images: ls_images.filter((item) => item.public_id !== id),
        loading: false,
      }));
    } catch (e) {
      setLState((cs) => ({ ...cs, loading: false }));
      console.log(e);
    }
  };
  return (
    <div className='row'>
      <div className='col-md-3'>
        <label className='btn btn-primary'>
          Upload Image
          <input
            hidden
            type='file'
            accept='image/*'
            onChange={fileResizeAndUpload}
            className='form-control'
            placeholder='Image'
          />
        </label>
      </div>
      <div className='col-md-9 c_grid'>
        {ls_images.map((img, i) => (
          <Image img={img} i={i} handleImageRemoval={handleImageRemoval} />
        ))}
      </div>
    </div>
  );
};

export default FileUpload;
