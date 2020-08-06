import React, { useCallback } from 'react';
import ReactLottie, { LottieProps, Options } from 'react-lottie';
import lottieFules from './9914-loading-success-fail-spinner-stroke-update.json';

export type LoadingProps = { options?: LottieProps };
export const Loading: React.FC<LoadingProps> = ({ options = {} }) => {
  // loading 基础配置
  const _options: Options = {
    loop: true,
    autoplay: true,
    animationData: lottieFules,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
    ...options,
  };

  const reactLottieProps: LottieProps = {
    options: _options,
    speed: 10,
  };

  return (
    <div>
      <ReactLottie {...reactLottieProps} />
    </div>
  );
};

export default Loading;
