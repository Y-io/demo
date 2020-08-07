import React, { useCallback, useRef, useState } from 'react';
import ReactLottie, { LottieProps, Options, EventListener } from 'react-lottie';
import lottieFiles from './9914-loading-success-fail-spinner-stroke-update.json';
import { useMount, useUpdateEffect } from 'ahooks';
import lottie, { AnimationItem } from 'lottie-web';

export type LoadingProps = { options?: LottieProps };
export const Loading: React.FC<LoadingProps> = ({ options = {} }) => {
  const LoadingRef = useRef<AnimationItem | null>();
  const enterFrameRef = useRef<boolean>(false);
  const [enterFrame, setEnterFrame] = useState(false);
  // loading 基础配置
  // const _options: Options = {
  //   loop: true,
  //   autoplay: true,
  //   animationData: lottieFiles,
  //   rendererSettings: {
  //     preserveAspectRatio: 'xMidYMid slice',
  //   },
  //   ...options,
  // };

  // const eventListeners: EventListener[] = [
  //   { eventName: 'complete', callback: () => console.log('complete') },
  // ];

  // const reactLottieProps: LottieProps = {
  //   options: _options,
  //   speed: 10,
  //   eventListeners,
  // };

  useMount(() => {
    LoadingRef.current = lottie.loadAnimation({
      container: document.getElementById('lottie') as HTMLDivElement, // the dom element that will contain the animation
      renderer: 'svg',
      // loop: true,
      autoplay: true,
      animationData: lottieFiles, // the path to the animation json
    });

    // loading 帧循环
    LoadingRef.current.playSegments([1, 118], true);

    LoadingRef.current.addEventListener('enterFrame', (e) => {
      console.log('enterFrame', e);
      if (Math.ceil(e.currentTime) >= e.totalTime) {
        setEnterFrame(true);

        if (!enterFrameRef.current) {
          LoadingRef.current?.playSegments([1, 118], true);
        } else {
          LoadingRef.current?.playSegments([1, 118], true);
        }
        // enterFrameRef.current = true;
      } else {
        // setEnterFrame(false);
        // enterFrameRef.current = false;
      }
      // console.log('enterFrame：', e)
    });
  });
  setTimeout(() => {
    // LoadingRef.current?.playSegments([1, 118], true);
    // LoadingRef.current?.goToAndStop(118, true);
    enterFrameRef.current = true;
    console.log('停止');
  }, 3000);

  useUpdateEffect(() => {}, []);
  // console.log(enterFrame);
  return <div id='lottie'>{/* <ReactLottie {...reactLottieProps} ref={LoadingRef} /> */}</div>;
};

export default Loading;
