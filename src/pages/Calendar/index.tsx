import React from 'react';
import moment from 'moment';
import _ from 'lodash';

import { useDrag } from 'react-use-gesture';
import { useSpring, animated } from 'react-spring';

import styles from './style.module.scss';
import { weeks, days } from './constants';

const month = moment().month() + 1; // 当前月份
const monthDays = moment().daysInMonth(); // 当前月天数
const lastMonthDays = moment().endOf('month').subtract('month', 1).endOf('month'); // 上个月最后一天

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
  // console.log({
  //   monthDayArr,
  //   月: month,
  //   天数: monthDays,
  //   第一天: monthFirstDay,
  //   最后一天: monthLastDayToWeek,
  //   当月第一天星期: monthFirstDayToWeek,
  //   上个月最后一天: lastMonthDays.toObject().date,
  // });

  const [{ y }, set] = useSpring(() => ({ y: 0 }));

  const dragBind = useDrag(
    (state) => {
      const { down, offset } = state;
      console.log(offset[1]);

      const y = offset[1] < -50 ? -160 : 0;

      set({ y: down ? offset[1] : y });
    },
    { axis: 'y' }
  );

  return (
    <div className={styles.Calendar}>
      <div className={styles.head}>
        {weeks.map((v) => (
          <div key={v} className={styles.week}>
            {v}
          </div>
        ))}
      </div>
      <div className={styles.content}>
        <div className={styles.days}>
          {monthDayArr.map((day, i) => (
            <div key={i} className={styles.day}>
              {day}
            </div>
          ))}
        </div>
      </div>
      <animated.div
        {...dragBind()}
        className={styles.drag}
        style={{ transform: y.interpolate((y) => `translateY(${y}px)`) }}
      />
    </div>
  );
}
