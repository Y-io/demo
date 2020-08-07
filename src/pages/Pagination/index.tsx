import React, { useCallback, useState } from 'react';

import { Pagination } from 'src/components';

export const PaginationPage: React.FC = () => {
  const [page, set] = useState<number>(1);
  const onChange = useCallback((v) => {
    console.log(v);
    set(v);
  }, []);
  return (
    <div style={{ margin: 'auto', marginTop: 100, width: 800 }}>
      <Pagination total={100} onChange={onChange} page={page} />
    </div>
  );
};

export default PaginationPage;
