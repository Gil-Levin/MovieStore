import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ImageGallery = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/images')
      .then((response) => {
        setImages(response.data);
      })
      .catch((error) => {
        console.error('Error fetching images:', error);
      });
  }, []);

  return (
    <div>
      <h1>Image Gallery</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {images.map((image) => (
          <div key={image.id} style={{ margin: '10px' }}>
            <img
              src={`data:image/jpeg;base64,${image.image_data}`}
              alt={image.title}
              style={{ width: '200px', height: '150px' }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
