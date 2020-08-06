import React, { useState, useRef } from 'react';
import moment from 'moment';
import _ from 'lodash';

import { useGesture } from 'react-use-gesture';
import { useSpring, animated, interpolate } from 'react-spring';

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

enum minRefType {
  MIN = 'MIN',
  MAX = 'MAX',
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

  const minRef = useRef<minRefType>(minRefType.MIN);

  const [isMin, setIsMin] = useState(false);

  const [{ y, h }, set] = useSpring(() => ({ y: 40, h: 40 }));

  const dragBind = useGesture(
    {
      onDrag: (state) => {
        // console.log({ state });
        const {
          down,
          delta: [, deltaY],
          initial: [, initialY],
          movement: [, movementY],
          direction: [, directionY],
          offset: [, offsetY],
          lastOffset: [, lastOffsetY],
        } = state;

        let _h = h.getValue();
        // console.log({ 首个: _h, getValue: h.getValue() });
        if (!down) {
          console.log('抬起');
          if (_h > 60) {
            _h = 200;
            minRef.current = minRefType.MAX;
            set({ h: _h, config: { duration: 300 } });
          } else {
            _h = 40;
            minRef.current = minRefType.MIN;
            set({ h: _h, config: { duration: 300 } });
          }
        } else {
          // const a = directionY >= 0 ? -movementY : movementY;
          console.log({ 前: _h });
          _h = initialY + offsetY - lastOffsetY - 70;
          console.log({ _h, offsetY, directionY, movementY, lastOffsetY });
          set({ h: _h, config: { duration: 0 } });
        }
      },
    },
    { drag: { axis: 'y' } }
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
      <animated.div className={styles.content} style={{ height: h.interpolate((h) => h) }}>
        <div className={styles.days}>
          {monthDayArr.map((day, i) => (
            <div key={i} className={styles.day}>
              {day}
            </div>
          ))}
        </div>
        <animated.div
          {...dragBind()}
          className={styles.drag}
          // style={{
          //   transform: y.interpolate((y) => `translateY(${y}px)`),
          // }}
        />
      </animated.div>
    </div>
  );
}
