import React, { useMemo } from 'react';
import RcPagination from 'rc-pagination';
import { Button } from '../Button';
import classNames from 'classnames';
import './style.module.scss';

export type PaginationProps = {
  total?: number;
  pageCount?: number;
  page?: number;
  onChange?: (v: number) => void;
};
export const Pagination: React.FC<PaginationProps> = ({
  total = 10,
  pageCount,
  page = 2,
  onChange,
}) => {
  // 总页数
  const count = useMemo(() => {
    if (pageCount) return pageCount;
    return Math.ceil(total / page);
  }, [total, pageCount, page]);
  console.log({ count });

  const buttonItemRender = (page: number, type: string, element: React.ReactNode) => {
    console.log({ type });
    if (type === 'prev') {
      return <Button onClick={() => onChange && onChange(page)}>上一页</Button>;
    }
    if (type === 'next') {
      return <Button onClick={() => onChange && onChange(page)}>下一页</Button>;
    }
    if (type === 'jump-prev') {
      return <Button onClick={() => onChange && onChange(page)}>上一页</Button>;
    }
    if (type === 'jump-next') {
      return <Button onClick={() => onChange && onChange(page)}>上一页</Button>;
    }
    return element;
  };

  return (
    <RcPagination
      className={'Pagination'}
      total={total}
      current={page}
      itemRender={buttonItemRender}
    />
  );
};

export default Pagination;
