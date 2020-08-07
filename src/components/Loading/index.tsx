import React from 'react';
import ReactLottie, { Options } from 'react-lottie';
import lottieFiles from './loading.json';

export type LoadingProps = {
  options?: Options;
  width?: number;
  height?: number;
};
export const Loading: React.FC<LoadingProps> = ({
  options = {} as Options,
  width = 22,
  height = 22,
}) => {
  const defaultOptions = { animationData: lottieFiles };

  return (
    <ReactLottie
      options={{ ...defaultOptions, ...options }}
      height={height + 10}
      width={width + 10}
    />
  );
};

export default Loading;
