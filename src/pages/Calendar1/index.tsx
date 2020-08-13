import React, { useState } from 'react';
import moment from 'moment';
import _ from 'lodash';
import { Override, Data } from 'framer';
import { motion, DragHandlers, PanInfo, useCycle, useAnimation } from 'framer-motion';

import styles from './style.module.scss';
import { weeks, days } from './constants';
import { useUpdateEffect } from 'ahooks';

// const month = moment().month() + 1; // 当前月份
// const monthDays = moment().daysInMonth(); // 当前月天数
// const lastMonthDays = moment().endOf('month').subtract('month', 1).endOf('month'); // 上个月最后一天

const monthFirstDay = moment().startOf('month'); // 当月第一天
const monthLastDay = moment().endOf('month'); // 当月第一天
const monthFirstDayToWeek = monthFirstDay.format('d'); // 当月第一天星期几
const monthLastDayToWeek = monthLastDay.format('d'); // 当月最后一天星期几

let monthDayArr: number[] = []; // 日历日期数组

if (monthFirstDayToWeek !== '0') {
  // 如果当月第一天不是周日
  monthDayArr = Array.from({ length: _.toNumber(monthFirstDayToWeek) }, (v, k) => 30 - k).sort();
}
monthDayArr = [...monthDayArr, ...days];
if (monthLastDayToWeek !== '6') {
  // 如果当月最后一天不是周六
  monthDayArr = [
    ...monthDayArr,
    ...Array.from({ length: 6 - _.toNumber(monthLastDayToWeek) }, (v, k) => k + 1),
  ];
}

export default function Calendar() {
  const [isMin, setIsMin] = useState(false);
  const [h, setH] = useState(40);
  const data = Data({ isActive: false });
  const onDrag = (e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    // console.log(info);
  };
  const onDragEnd = (e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const { point } = info;
    if (point.y >= 200) {
      controls.start('hidden');
    } else {
      controls.start('visible');
    }
  };
  useUpdateEffect(() => {
    console.log('useUpdateEffect');
  }, [isMin]);
  console.log(data.isActive);
  const controls = useAnimation();
  return (
    <div className={styles.Calendar}>
      <div className={styles.head}>
        {weeks.map((v) => (
          <div key={v} className={styles.week}>
            {v}
          </div>
        ))}
      </div>
      <motion.div
        drag='y'
        onDragEnd={onDragEnd}
        // className={styles.drag}
        className={styles.content}
        initial='hidden'
        animate={controls}
        variants={{
          visible: { y: -160 },
          hidden: { y: 0 },
        }}
        dragConstraints={{ top: 0, bottom: 0 }}
        transition={{
          y: { type: 'spring', stiffness: 300, damping: 200 },
          opacity: { duration: 0.2 },
        }}
      >
        <div className={styles.days}>
          {monthDayArr.map((day, i) => (
            <div key={i} className={styles.day}>
              {day}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
