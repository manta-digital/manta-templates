/**
 * Defines the visual style variants for card components.
 * - `base`: Standard card with default styling.
 * - `elevated`: Card with shadow for a lifted appearance.
 * - `bordered`: Card with a visible border.
 * - `gradient`: Card with a gradient background.
 * - `interactive`: Card with enhanced hover and focus states.
 */
export type CardVariant = 'base' | 'elevated' | 'bordered' | 'gradient' | 'interactive';

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
 */
export type CardState = 'default' | 'hover' | 'active' | 'disabled';

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
   * @default 'base'
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
