import React from 'react';
import classNames from 'classnames';

import { motion, AnimatePresence } from 'framer-motion';

import { Loading } from '../Loading';

import styles from './style.module.scss';
const spring = {
  type: 'spring',
  stiffness: 700,
  damping: 30,
};
export type ButtonProps = {
  disabled?: boolean;
  children?: React.ReactNode;
  loading?: boolean;
};
export const Button: React.FC<ButtonProps> = ({ disabled = false, children, loading = true }) => {
  const contentMotion = { show: { opacity: 1, y: 0 }, hide: { opacity: 0, y: 32 } };
  const loadingMotion = {
    show: { opacity: 1, y: '-50%', x: '-50%' },
    hide: { opacity: 0, y: -32, x: '-50%' },
  };

  return (
    <button
      data-loading={loading}
      className={classNames(styles.Button, { [styles.Button_loading]: loading })}
      disabled={loading || disabled}
    >
      <AnimatePresence initial={false}>
        {loading && (
          <motion.div
            className={styles.loading}
            key='loading'
            initial='hide'
            animate='show'
            exit='hide'
            variants={loadingMotion}
            transition={spring}
          >
            <Loading width={32} height={32} />
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        className={styles.content}
        animate={loading ? 'hide' : 'show'}
        variants={contentMotion}
        transition={spring}
      >
        <span>{children}</span>
      </motion.div>
    </button>
  );
};

export default Button;
