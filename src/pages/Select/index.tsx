import React from 'react';
import { Select, SelectItem } from 'src/components';

const SelectData: SelectItem[] = [
  { label: '第1天', value: '1' },
  { label: '第2天', value: '2' },
  { label: '第3天', value: '3', aaaa: 1 },
];

export const SelectPage: React.FC = () => {
  return (
    <div style={{ margin: 'auto' }}>
      <Select data={SelectData} onChange={(v, i) => console.log({ v, i })} />
    </div>
  );
};

export default SelectPage;
