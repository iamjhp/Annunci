import adsService from '../services/ads';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const AdDetails = () => {
  const [ad, setAd] = useState('');
  const { id } = useParams();

  useEffect(() => {
    adsService.getItemById(id).then((item) => setAd(item));
  }, [id]);

  return (
    <div>
      <h1>Details {id}</h1>
      {ad !== null ? (
        <div>
          <p>{ad.title}</p>
          <p>{ad.price}</p>
          <p>{ad.offer}</p>
          <p>{ad.owner}</p>
        </div>
      ) : (
        ad === '' ? (
          <p>Loading...</p>
        ) : (
          <p>not found</p>
        )
      )}
    </div>
  );
};

export default AdDetails;
