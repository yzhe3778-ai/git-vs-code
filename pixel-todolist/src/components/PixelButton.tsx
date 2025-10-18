import React from 'react';
import styles from './PixelButton.module.css';

interface PixelButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'danger';
  size?: 'normal' | 'small';
  children: React.ReactNode;
}

export const PixelButton: React.FC<PixelButtonProps> = ({
  variant = 'primary',
  size = 'normal',
  children,
  className = '',
  ...props
}) => {
  const classNames = [
    styles['pixel-button'],
    variant === 'danger' && styles['pixel-button-danger'],
    size === 'small' && styles['pixel-button-small'],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button className={classNames} {...props}>
      {children}
    </button>
  );
};
