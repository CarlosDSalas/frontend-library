import React from 'react';

interface TemplateProps {
  title: string;
  subtitle: string;
}

const MyComponent: React.FC<TemplateProps> = ({ title, subtitle }) => {
  return (
    <div>
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </div>
  );
};

export default MyComponent;