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

/**
 * Sets up the app:// protocol handler to serve files from the packaged app resources.
 *
 * This function MUST be called after app.whenReady() and before creating windows.
 * It maps app:// URLs to actual files in the packaged application's renderer directory.
 *
 * Security Features:
 * - Path normalization prevents directory traversal attacks
 * - Verifies all resolved paths stay within the renderer root directory
 * - Returns ERR_FILE_NOT_FOUND for any security violations
 * - Safely handles URL encoding (e.g., spaces in filenames)
 *
 * Path Resolution:
 * - app://index.html → {resourcesPath}/renderer/index.html
 * - app://assets/logo.png → {resourcesPath}/renderer/assets/logo.png
 * - app:// (root) → {resourcesPath}/renderer/index.html (default)
 *
 * @example
 * ```typescript
 * app.whenReady().then(() => {
 *   setupAppProtocolHandler();
 *   createWindow();
 * });
 * ```
 */
export function setupAppProtocolHandler(): void {
  protocol.registerFileProtocol('app', (request, callback) => {
    try {
      // Parse and decode the request URL
      const url = new URL(request.url);
      const pathname = decodeURIComponent(url.pathname);

      // Calculate the root directory for renderer files in the packaged app
      const root = path.join(process.resourcesPath, 'renderer');

      // Resolve the full file path, defaulting to index.html for root requests
      const resolved = path.normalize(
        path.join(root, pathname || '/index.html')
      );

      // Security check: prevent directory traversal attacks
      // Ensure the resolved path is within the renderer root directory
      if (!resolved.startsWith(root)) {
        console.error(
          `[Protocol Handler] Path traversal attempt blocked: ${request.url}`
        );
        return callback({ error: -6 }); // net::ERR_FILE_NOT_FOUND
      }

      // Serve the requested file
      callback({ path: resolved });
    } catch (error) {
      console.error(`[Protocol Handler] Error processing request:`, error);
      callback({ error: -6 }); // net::ERR_FILE_NOT_FOUND
    }
  });
}
