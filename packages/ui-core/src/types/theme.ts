// Framework-agnostic theme types and interfaces

export type Theme = 'light' | 'dark';
export type Accent = 'teal' | 'mintteal' | 'blue' | 'purple' | 'orange' | 'forest' | 'banana' | 'sunset';

export interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
  defaultAccent?: Accent;
}

export interface ThemeProviderState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  accent: Accent;
  setAccent: (accent: Accent) => void;
}

// Icon component interface for dependency injection
export interface IconProps {
  strokeWidth?: number;
  className?: string;
}

export interface IconComponent {
  (props: IconProps): React.ReactElement;
}