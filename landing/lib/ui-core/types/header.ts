// Framework-agnostic header types and interfaces

export interface HeaderLink {
  href: string;
  label: string;
  external?: boolean;
}

export interface HeaderContent {
  logo?: string;
  /** Optional alternate logo used when the site is in dark theme */
  logoDark?: string;
  title?: string;
  links: HeaderLink[];
}

export interface HeaderProps {
  content: HeaderContent;
  ImageComponent?: React.ComponentType<any>;
  LinkComponent?: React.ComponentType<any>;
  className?: string;
}

export interface HeaderWrapperProps {
  content: HeaderContent;
  variant?: 'default';
  ImageComponent?: React.ComponentType<any>;
  LinkComponent?: React.ComponentType<any>;
  className?: string;
}