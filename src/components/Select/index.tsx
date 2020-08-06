import React, { useCallback, useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import classNames from 'classnames';
import { useClickAway } from 'ahooks';
import styles from './style.module.scss';

export type SelectItem = { [key: string]: string | number; label: string; value: string | number };
export type SelectProps = {
  data: SelectItem[];
  defaultValue?: SelectItem;
  value?: SelectItem;
  placeholder?: string;
  isTheme?: boolean;
  onChange?: (v: SelectItem, i: number) => void;
};
export const Select: React.FC<SelectProps> = (props) => {
  const { defaultValue, value, placeholder, data = [], isTheme = false, onChange } = props;
  const SelectRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<Boolean>(false);

  const listVariants = {
    open: { opacity: 1, y: 1 },
    collapsed: { opacity: 0, y: -10 },
  };
  const item = { show: { y: 0, opacity: 1 }, hide: { opacity: 0, y: -10 } };
  useClickAway(() => {
    setOpen(false);
  }, SelectRef);
  const onClick = useCallback(() => {
    setOpen(true);
  }, []);

  const _value = useMemo<SelectItem>(() => {
    return value || defaultValue || { label: placeholder || '请选择', value: '' };
  }, [value, defaultValue, placeholder]);

  const _onChange = useCallback(
    (v, i) => {
      if (onChange) onChange(v, i);
    },
    [onChange]
  );

  return (
    <div className={classNames(styles.Select, { [styles.Select_theme]: isTheme })} ref={SelectRef}>
      <motion.div
        className={styles.label}
        onClick={onClick}
        style={{ borderColor: open ? '#e2b96f' : '' }}
      >
        {_value.label} <div className={styles.icon} />
      </motion.div>
      <AnimatePresence initial={false}>
        {open && (
          <motion.ul
            key='content'
            initial='collapsed'
            exit='collapsed'
            animate='open'
            variants={listVariants}
            transition={{ duration: 0.3 }}
          >
            {data.map((v, i) => (
              <motion.li
                key={v.label}
                initial='hide'
                exit='hide'
                animate='show'
                variants={item}
                onClick={() => _onChange(v, i)}
              >
                {v.label}
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Select;
