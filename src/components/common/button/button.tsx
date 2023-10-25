import { ReactNode } from 'react';

import './button.scss';

type Props = {
  children: ReactNode;
  disabled?: boolean;
  width?: number;
  className?: string;
  onClick?: () => void;
};

export const Button = ({ children, disabled, width, className, onClick }: Props) => (
  <button
    className={`common-button ${className}`}
    style={{ width: `${width}px` }}
    type='button'
    disabled={disabled}
    onClick={onClick}
  >
    {children}
  </button>
);
