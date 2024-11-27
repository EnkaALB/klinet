import React from 'react';

const Logo = ({ className = "h-8 w-auto" }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <svg
        className="h-full"
        viewBox="0 0 120 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20 0H40L20 40H0L20 0Z"
          fill="url(#gradient1)"
        />
        <path
          d="M30 0H50L30 40H10L30 0Z"
          fill="url(#gradient2)"
          fillOpacity="0.8"
        />
        <text
          x="55"
          y="28"
          className="font-bold"
          style={{
            fill: '#FFFFFF',
            fontSize: '24px',
            fontFamily: 'Arial, sans-serif'
          }}
        >
          Klinet
        </text>
        <defs>
          <linearGradient
            id="gradient1"
            x1="0"
            y1="0"
            x2="40"
            y2="40"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#3B82F6" />
            <stop offset="1" stopColor="#10B981" />
          </linearGradient>
          <linearGradient
            id="gradient2"
            x1="10"
            y1="0"
            x2="50"
            y2="40"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#60A5FA" />
            <stop offset="1" stopColor="#34D399" />
          </linearGradient>
        </defs>
      </svg>
      <span className="ml-2 text-sm text-blue-500 font-medium">Eco-Friendly</span>
    </div>
  );
};

export default Logo;
