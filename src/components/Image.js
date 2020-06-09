import React from 'react';

const Image = ({ img = {}, i, handleImageRemoval = (f) => f }) => (
  <img
    src={img.url}
    key={i}
    alt={img.public_id}
    className='img-thumbnail'
    style={{ cursor: 'pointer' }}
    onClick={() => handleImageRemoval(img.public_id)}
  />
);

export default Image;
