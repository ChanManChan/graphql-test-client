import React from 'react';
import Resizer from 'react-image-file-resizer';
import axios from 'axios';
import { AuthContext } from '../context/authContext';
import Image from './Image';

const FileUpload = ({
  setLState,
  ls_images = [],
  singleUpload = false,
  image = {},
}) => {
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
            if (singleUpload)
              setLState((cs) => ({ ...cs, image: data, loading: false }));
            else
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
      if (singleUpload)
        setLState((cs) => ({
          ...cs,
          image: {
            url: 'https://via.placeholder.com/150.png?text=Post',
            public_id: new Date().getTime(),
          },
          loading: false,
        }));
      else
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
        {singleUpload ? (
          <Image
            img={image}
            i={image.public_id}
            handleImageRemoval={handleImageRemoval}
          />
        ) : (
          ls_images.map((img, i) => (
            <Image img={img} i={i} handleImageRemoval={handleImageRemoval} />
          ))
        )}
      </div>
    </div>
  );
};

export default FileUpload;
