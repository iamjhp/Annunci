import { useEffect, useState } from 'react';
import Test from './Test';
import { Loader } from '@mantine/core';
import adsService from '../services/ads';

const Route = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    adsService.getAllImages().then((img) => {
      setImages(img);
    });
  }, []);

  return (
    <div>
      {images.length !== 0 ? (
        <Test images={images} />
      ) : (
        <Loader color="gray" size="150" />
      )}
    </div>
  );
};

export default Route;
