import React from 'react';

import { Loading } from 'src/components';

export const LoadingPage: React.FC = () => {
  return (
    <div style={{ margin: 'auto', backgroundColor: '#999999' }}>
      <Loading />
    </div>
  );
};

export default LoadingPage;
