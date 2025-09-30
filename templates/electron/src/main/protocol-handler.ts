import { protocol } from 'electron';
import path from 'node:path';

/**
 * Registers the app:// protocol with elevated privileges.
 *
 * This function MUST be called before app.whenReady() to properly configure
 * the custom protocol scheme with the necessary privileges for serving web content.
 *
 * The app:// protocol provides:
 * - Standard URL behavior (like http://)
 * - Secure context for web APIs
 * - Fetch API support
 * - CORS capabilities
 *
 * @example
 * ```typescript
 * // In main.ts, before app.whenReady()
 * registerAppProtocol();
 *
 * app.whenReady().then(() => {
 *   setupAppProtocolHandler();
 *   createWindow();
 * });
 * ```
 */
export function registerAppProtocol(): void {
  protocol.registerSchemesAsPrivileged([
    {
      scheme: 'app',
      privileges: {
        standard: true,
        secure: true,
        supportFetchAPI: true,
        corsEnabled: true,
      },
    },
  ]);
}
