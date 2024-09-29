import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Attribute } from '@/lib/types';
import Text from './Text';

//'danceability' | 'energy' | 'loudness' | 'speechiness' | 'acousticness' | 'instrumentalness' | 'liveness' | 'valence' | 'tempo' | 'timeSignature' | 'popularity';

export default function Dropdown({ attribute, onChangeAttribute }: { attribute: string, onChangeAttribute: (attribute: Attribute) => void }) {
  // Handle change event when user selects a metric
  const handleMetricChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChangeAttribute(event.target.value as Attribute);  // Update state with the selected metric
  };

  return (
    <div>
      <select onChange={handleMetricChange} className="form-select" aria-label="Select Metric">
        <option value="Popularity">Popularity</option>
        <option value="Danceability">Danceability</option>
        <option value="Energy">Energy</option>
        <option value="Loudness">Loudness</option>
        <option value="Speechiness">Speechiness</option>
        <option value="Acousticness">Acousticness</option>
        <option value="Instrumentalness">Instrumentalness</option>
        <option value="Liveness">Liveness</option>
        <option value="Valence">Valence</option>
        <option value="Tempo">Tempo</option>
      </select>
    </div>
  );
};
