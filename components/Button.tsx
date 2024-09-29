import React, { ReactNode, MouseEvent } from 'react';

// Define the props for the Button component
interface ButtonProps {
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;  // Typing the onClick function
  children: ReactNode;  // This represents the content inside the button (text or elements)
  className?: string;  // Optional className for custom styling
  type?: 'button' | 'submit' | 'reset';  // Button type (defaults to 'button')
  disabled?: boolean;  // Disable button flag
  size?: 'small' | 'medium' | 'large';  // Optional size prop for different button sizes
}

// Button component with typed props
const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  className = '',
  type = 'button',
  disabled = false,
  size = 'medium',
}) => {
  // Define size-based classes for different button sizes
  const sizeClasses =
    size === 'small' ? 'px-2 py-1 text-sm' : size === 'large' ? 'px-6 py-3 text-lg' : 'px-4 py-2';

  return (
    <button
      onClick={onClick}
      type={type}
      className={`rounded ${sizeClasses} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
