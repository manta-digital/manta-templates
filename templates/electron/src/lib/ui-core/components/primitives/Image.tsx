import * as React from 'react';

interface CoreImageProps {
  src: string;
  alt: string;
  className?: string;
  ImageComponent?: React.ComponentType<any>;
  [key: string]: any;
}

export const CoreImage: React.FC<CoreImageProps> = ({ 
  ImageComponent = 'img', 
  ...props 
}) => {
  const Component = ImageComponent;
  return <Component {...props} />;
};