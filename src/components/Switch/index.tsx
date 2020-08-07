import React, { useCallback } from 'react';
import { motion } from 'framer-motion';
import classNames from 'classnames';
import styles from './style.module.scss';
const spring = {
  type: 'spring',
  stiffness: 700,
  damping: 30,
};

export type SwitchProps = {
  disabled?: boolean;
  isTheme?: boolean;
  isOn?: boolean;
  toggleSwitch?: (v: boolean) => void;
};
export const Switch: React.FC<SwitchProps> = ({
  disabled = false,
  isTheme = false,
  isOn = false,
  toggleSwitch,
}) => {
  const onClick = useCallback(() => {
    toggleSwitch && toggleSwitch(!isOn);
  }, [toggleSwitch, isOn]);
  return (
    <button
      className={classNames(styles.Switch, { [styles.Switch_theme]: isTheme })}
      data-ison={isOn}
      onClick={onClick}
      disabled={disabled}
    >
      <motion.div className={styles.handle} layout transition={spring} />
    </button>
  );
};

export default Switch;
