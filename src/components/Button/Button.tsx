import React from 'react';
import { Button as NativeBaseButton, IButtonProps } from 'native-base';

const Button: React.FC<IButtonProps> = (props) => {
  return <NativeBaseButton {...props} />;
};

export default Button;
