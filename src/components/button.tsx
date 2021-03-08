import React from 'react'
import {ButtonCoin} from "../App";

interface ButtonProps {
  title: string;
  onClick: (e?: React.MouseEvent) => void;
}

export const Button = (props: ButtonProps) => {
  return <ButtonCoin
    onClick={props.onClick}
  >
    {props.title}
  </ButtonCoin>
};