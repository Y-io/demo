import React, { useState } from 'react';
import moment from 'moment';
import _ from 'lodash';
import { motion, DragHandlers, PanInfo } from 'framer-motion';

import styles from './style.module.scss';
import { weeks, days } from './constants';

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

// enum minRefType {
//   MIN = 'MIN',
//   MAX = 'MAX',
// }

export default function Calendar() {
  // console.log({
  //   monthDayArr,
  //   月: month,
  //   天数: monthDays,
  //   第一天: monthFirstDay,
  //   最后一天: monthLastDayToWeek,
  //   当月第一天星期: monthFirstDayToWeek,
  //   上个月最后一天: lastMonthDays.toObject().date,
  // });

  // const minRef = useRef<minRefType>(minRefType.MIN);

  const [isMin, setIsMin] = useState(false);
  const [h, setH] = useState(40);

  const onDrag = (e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    // console.log(info);
  };
  const onDragEnd = (e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    console.log(info);
    const { offset } = info;
    if (offset.y <= -120) {
      console.log('小雨');
    }
    setIsMin(offset.y <= -120);
  };

  return (
    <div className={styles.Calendar}>
      <div className={styles.head}>
        {weeks.map((v) => (
          <div key={v} className={styles.week}>
            {v}
          </div>
        ))}
      </div>
      <motion.div className={styles.content} style={{ height: h }}>
        <div className={styles.days}>
          {monthDayArr.map((day, i) => (
            <div key={i} className={styles.day}>
              {day}
            </div>
          ))}
        </div>
        <motion.div
          drag='y'
          onDrag={onDrag}
          onDragEnd={onDragEnd}
          className={styles.drag}
          dragConstraints={{ top: -160, bottom: 0 }}
          transition={{
            y: { type: 'spring', stiffness: 300, damping: 200 },
            opacity: { duration: 0.2 },
          }}
          dragElastic={1}
          style={{ transform: `translateY(${isMin ? -160 : 0}px)` }}
          // style={{
          //   transform: y.interpolate((y) => `translateY(${y}px)`),
          // }}
        />
      </motion.div>
    </div>
  );
}
