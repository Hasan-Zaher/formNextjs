import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient': 'linear-gradient(to right, #f8cf44, #ffa500)',
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            
      },
      colors: {
        'custom-yellow': '#ffb70f',
      },
      keyframes: {
        drop: {
          '0%': {
            transform: 'scale(0) translateY(20px)',
            opacity: '0',
          },
          '50%': {
            transform: 'scale(1.1) translateY(-10px)',
            opacity: '1',
          },
          '100%': {
            transform: 'scale(1) translateY(0)',
            opacity: '1',
          },
        },
      },
      pulse: {
        '0%': {
           transform: 'scale(0)'
          
        },
        '50%': {
          transform: 'scale(1.2)'
         
       },
        '100%': {
           transform: 'scale(1)'
          
        },
        
        
      },
      animation: {
        drop: 'drop 0.6s ease-out',
        pulse: 'pulse 1s ease-out ',
      },
      
    },
    
  },
  plugins: [],
  
};
export default config;
