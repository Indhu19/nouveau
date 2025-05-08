import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
}) => {
  const baseClasses = 'rounded px-4 font-semibold';
  let variantClasses = '';
  let sizeClasses = '';
  let disabledClasses = '';

  // Variant styles
  if (variant === 'primary') {
    variantClasses = 'bg-blue-500 text-white';
  } else if (variant === 'secondary') {
    variantClasses = 'bg-gray-500 text-white';
  } else {
    variantClasses = 'bg-transparent border text-black';
  }

  // Size styles
  if (size === 'sm') {
    sizeClasses = 'py-1 text-sm';
  } else if (size === 'md') {
    sizeClasses = 'py-2 text-base';
  } else {
    sizeClasses = 'py-3 text-lg';
  }

  // Disabled styles
  if (disabled) {
    disabledClasses = 'opacity-50 cursor-not-allowed';
  }

  const className = `${baseClasses} ${variantClasses} ${sizeClasses} ${disabledClasses}`;

  return (
    <button className={className} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
