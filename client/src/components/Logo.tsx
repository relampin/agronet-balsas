import React from 'react';

interface LogoProps {
  variant?: 'default' | 'footer';
}

const Logo: React.FC<LogoProps> = ({ variant = 'default' }) => {
  if (variant === 'footer') {
    return (
      <div className="text-2xl font-bold">
        <span className="text-white">AGRO</span>
        <span className="text-white/90">NET</span>
        <span className="text-xs text-white/80">.TEC.BR</span>
      </div>
    );
  }
  
  return (
    <div className="font-bold text-2xl">
      <span className="text-primary">AGRO</span>
      <span className="text-secondary">NET</span>
      <span className="text-xs text-gray-800">.TEC.BR</span>
    </div>
  );
};

export default Logo;
