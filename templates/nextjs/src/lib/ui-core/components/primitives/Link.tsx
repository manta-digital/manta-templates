import * as React from 'react';

interface CoreLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  LinkComponent?: React.ComponentType<any>;
  [key: string]: any;
}

export const CoreLink: React.FC<CoreLinkProps> = ({
  LinkComponent = 'a',
  ...props
}) => {
  const Component = LinkComponent;
  return <Component {...props} />;
};