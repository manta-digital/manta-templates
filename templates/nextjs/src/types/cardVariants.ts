/**
 * Defines the visual style variants for card components.
 * - `default`: Standard card with default styling.
 * - `primary`: Primary card with brand colors.
 * - `elevated`: Card with shadow for a lifted appearance.
 * - `bordered`: Card with a visible border.
 * - `gradient`: Card with a gradient background.
 * - `interactive`: Card with enhanced hover and focus states.
 * - `accent`: Card with accent background colors.
 * - `surface`: Card with surface background and backdrop blur.
 */
export type CardVariant = 'default' | 'primary' | 'elevated' | 'bordered' | 'gradient' | 'interactive' | 'accent' | 'surface';

/**
 * Defines the size variants for card components, supporting responsive design.
 * - `sm`: Small
 * - `md`: Medium (default)
 * - `lg`: Large
 * - `xl`: Extra Large
 */
export type CardSize = 'sm' | 'md' | 'lg' | 'xl';

/**
 * Defines the interaction states for card components.
 * - `default`: The default, non-interactive state.
 * - `hover`: The state when the user hovers over the card.
 * - `active`: The state when the card is being actively pressed or clicked.
 * - `disabled`: The state when the card is disabled and cannot be interacted with.
 * - `loading`: The state when the card is in a loading state.
 * - `success`: The state when the card shows a success state.
 * - `error`: The state when the card shows an error state.
 */
export type CardState = 'default' | 'hover' | 'active' | 'disabled' | 'loading' | 'success' | 'error';

/**
 * Defines the corner radius variants for card components.
 * - `none`: No border radius (sharp corners)
 * - `sm`: Small border radius (subtle rounding)
 * - `md`: Medium border radius (default)
 * - `lg`: Large border radius (more rounded)
 * - `xl`: Extra large border radius (very rounded)
 */
export type CardRadius = 'none' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * A comprehensive interface for all card variant properties.
 * This can be used to type the props of card components that use this variant system.
 */
export interface CardVariantProps {
  /**
   * The visual style of the card.
   * @default 'default'
   */
  variant?: CardVariant;
  /**
   * The size of the card.
   * @default 'md'
   */
  size?: CardSize;
  /**
   * The current interaction state of the card.
   * This is typically managed internally by the component.
   * @default 'default'
   */
  state?: CardState;
  /**
   * The corner radius of the card.
   * @default 'md'
   */
  radius?: CardRadius;
}
