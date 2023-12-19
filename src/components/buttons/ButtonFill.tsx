'use client';
import React from 'react';

export type ButtonType = {
  onClick: () => void;
  children: React.ReactNode;
  classes: string;
  disabled?: boolean;
};

const ButtonFill = ({
  onClick,
  children,
  classes,
  disabled = false,
}: ButtonType) => {
  return (
    <button
      className={`rounded-md border ${classes} box-border block px-4 py-0 text-base font-semibold hover:opacity-80`}
      onClick={() => onClick()}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default ButtonFill;
