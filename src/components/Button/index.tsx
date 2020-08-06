import React from 'react';
import classNames from 'classnames';

import { motion, AnimatePresence } from 'framer-motion';

import styles from './style.module.scss';

export type ButtonProps = { disabled?: boolean; children?: React.ReactNode; loading?: boolean };
export const Button: React.FC<ButtonProps> = ({ disabled = false, children, loading = true }) => {
  return (
    <button className={classNames(styles.Button)} disabled={disabled}>
      <AnimatePresence initial={false}>
        {loading ? (
          'loading'
        ) : (
          <>
            <span className={styles.icon}></span>
            <span>{children}</span>
          </>
        )}
      </AnimatePresence>
    </button>
  );
};

export default Button;
