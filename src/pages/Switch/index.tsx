import React, { useCallback, useState } from 'react';

import { Switch } from 'src/components';

export const SwitchPage: React.FC = () => {
  const [isOn, set] = useState(false);
  const toggleSwitch = useCallback(() => {
    set(!isOn);
  }, [isOn]);
  return (
    <div style={{ margin: 'auto' }}>
      <Switch toggleSwitch={toggleSwitch} isOn={isOn} />
    </div>
  );
};

export default SwitchPage;
