/** @jsxImportSource @emotion/react */

import { useParams } from 'react-router-dom';

import { ViewModeContainer } from 'common';
import { MockUpData } from './mockData';

export const DetailPage = () => {
  const { id } = useParams();

  return <ViewModeContainer profileData={MockUpData} />;
};
