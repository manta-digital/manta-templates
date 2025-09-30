import { describe, it, expect, vi, beforeEach } from 'vitest';
import path from 'node:path';

// Mock Electron's protocol module using vi.hoisted for proper hoisting
const { mockRegisterSchemesAsPrivileged, mockRegisterFileProtocol } = vi.hoisted(() => ({
  mockRegisterSchemesAsPrivileged: vi.fn(),
  mockRegisterFileProtocol: vi.fn(),
}));

vi.mock('electron', () => ({
  protocol: {
    registerSchemesAsPrivileged: mockRegisterSchemesAsPrivileged,
    registerFileProtocol: mockRegisterFileProtocol,
  },
}));

// Import after mocking
import { registerAppProtocol, setupAppProtocolHandler } from '../protocol-handler';

describe('Protocol Handler', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('registerAppProtocol', () => {
    it('should register app:// protocol with correct privileges', () => {
      registerAppProtocol();

      expect(mockRegisterSchemesAsPrivileged).toHaveBeenCalledOnce();
      expect(mockRegisterSchemesAsPrivileged).toHaveBeenCalledWith([
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
    });
  });

  describe('setupAppProtocolHandler', () => {
    let protocolHandler: (
      request: { url: string },
      callback: (response: { path?: string; error?: number }) => void
    ) => void;

    beforeEach(() => {
      // Mock process.resourcesPath
      Object.defineProperty(process, 'resourcesPath', {
        value: '/app/resources',
        writable: true,
        configurable: true,
      });

      // Capture the registered handler
      mockRegisterFileProtocol.mockImplementation((scheme, handler) => {
        protocolHandler = handler;
      });

      setupAppProtocolHandler();
    });

    it('should register file protocol handler for app scheme', () => {
      expect(mockRegisterFileProtocol).toHaveBeenCalledOnce();
      expect(mockRegisterFileProtocol).toHaveBeenCalledWith('app', expect.any(Function));
    });

    it('should resolve valid paths correctly', () => {
      const callback = vi.fn();
      protocolHandler({ url: 'app://images/logo.png' }, callback);

      expect(callback).toHaveBeenCalledWith({
        path: path.normalize('/app/resources/renderer/images/logo.png'),
      });
    });

    it('should default to index.html for root path', () => {
      const callback = vi.fn();
      protocolHandler({ url: 'app://' }, callback);

      expect(callback).toHaveBeenCalledWith({
        path: path.normalize('/app/resources/renderer/index.html'),
      });
    });

    it('should handle URL-encoded paths correctly', () => {
      const callback = vi.fn();
      protocolHandler({ url: 'app://images/my%20file.png' }, callback);

      expect(callback).toHaveBeenCalledWith({
        path: path.normalize('/app/resources/renderer/images/my file.png'),
      });
    });

    it('should block path traversal attacks with ../', () => {
      const callback = vi.fn();
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      protocolHandler({ url: 'app://../../../etc/passwd' }, callback);

      expect(callback).toHaveBeenCalledWith({ error: -6 });
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        expect.stringContaining('Path traversal attempt blocked')
      );

      consoleErrorSpy.mockRestore();
    });

    it('should block encoded path traversal attacks', () => {
      const callback = vi.fn();
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      // Test with a path that tries to escape via encoded traversal in hostname
      protocolHandler({ url: 'app://..%2F..%2Fetc/passwd' }, callback);

      expect(callback).toHaveBeenCalledWith({ error: -6 });
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        expect.stringContaining('Path traversal attempt blocked')
      );

      consoleErrorSpy.mockRestore();
    });

    it('should allow legitimate nested paths', () => {
      const callback = vi.fn();
      protocolHandler({ url: 'app://assets/images/nested/logo.png' }, callback);

      expect(callback).toHaveBeenCalledWith({
        path: path.normalize('/app/resources/renderer/assets/images/nested/logo.png'),
      });
    });

    it('should handle malformed URLs gracefully', () => {
      const callback = vi.fn();
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      // Pass an invalid URL that will throw during parsing
      protocolHandler({ url: 'not-a-valid-url' }, callback);

      expect(callback).toHaveBeenCalledWith({ error: -6 });
      // console.error is called with 2 arguments: message and error object
      expect(consoleErrorSpy).toHaveBeenCalled();
      expect(consoleErrorSpy.mock.calls[0][0]).toContain('Error processing request');

      consoleErrorSpy.mockRestore();
    });

    it('should handle paths with special characters', () => {
      const callback = vi.fn();
      protocolHandler({ url: 'app://files/test%20(1).pdf' }, callback);

      expect(callback).toHaveBeenCalledWith({
        path: path.normalize('/app/resources/renderer/files/test (1).pdf'),
      });
    });

    it('should normalize paths to prevent double slashes', () => {
      const callback = vi.fn();
      protocolHandler({ url: 'app:///images//logo.png' }, callback);

      // path.normalize should clean up the double slashes
      const resultPath = path.normalize('/app/resources/renderer/images/logo.png');
      expect(callback).toHaveBeenCalledWith({ path: resultPath });
    });
  });
});
