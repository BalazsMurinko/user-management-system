import '@testing-library/jest-dom';
import 'jest-styled-components';

type MockMediaQueryList = {
  matches: boolean;
  media: string;
  onchange: null;
  addListener: jest.Mock;
  removeListener: jest.Mock;
  addEventListener: jest.Mock;
  removeEventListener: jest.Mock;
  dispatchEvent: jest.Mock;
};

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query: string): MockMediaQueryList => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock ResizeObserver
class ResizeObserverStub {
  observe = jest.fn();
  unobserve = jest.fn();
  disconnect = jest.fn();
}

global.ResizeObserver = ResizeObserverStub as any;

// Mock scrollIntoView
if (typeof Element !== 'undefined') {
  Element.prototype.scrollIntoView = jest.fn();
}

// Mock console methods to reduce test noise
const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
const consoleWarn = jest.spyOn(console, 'warn').mockImplementation(() => {});

// Reset all mocks after each test
afterEach(() => {
  jest.clearAllMocks();
});

// Clean up after all tests are done
afterAll(() => {
  consoleError.mockRestore();
  consoleWarn.mockRestore();
});
