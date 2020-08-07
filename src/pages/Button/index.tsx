import React, { useState } from 'react';
import { Button } from 'src/components';

export const ButtonPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <div style={{ margin: 'auto' }}>
      <button onClick={() => setLoading(true)}>start loading</button>
      <button onClick={() => setLoading(false)}>stop loading</button>
      <Button loading={loading} disabled>
        提交
      </Button>
    </div>
  );
};

export default ButtonPage;
