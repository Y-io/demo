import React from 'react';
import { Link, Switch as SwitchRouter, BrowserRouter, Route } from 'react-router-dom';
import styles from './style.module.scss';
import Calendar from 'src/pages/Calendar1';
import Select from 'src/pages/Select';
import Switch from 'src/pages/Switch';

export default function Layout() {
  const navs = [
    { name: '日历', path: '/calendar' },
    { name: '选择器', path: '/select' },
    { name: 'Switch', path: '/switch' },
  ];
  return (
    <BrowserRouter>
      <div className={styles.navs}>
        {navs.map((v) => (
          <Link key={v.path} to={v.path}>
            {v.name}
          </Link>
        ))}
      </div>
      <div className={styles.content}>
        <SwitchRouter>
          <Route path='/calendar' component={Calendar} />
          <Route path='/select' component={Select} />
          <Route path='/switch' component={Switch} />
        </SwitchRouter>
      </div>
    </BrowserRouter>
  );
}
