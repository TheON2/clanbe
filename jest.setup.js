import '@testing-library/jest-dom';

// TextDecoder와 TextEncoder를 글로벌 객체로 추가
import { TextEncoder, TextDecoder } from 'util';
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// setImmediate를 글로벌 객체로 추가
global.setImmediate = (fn, ...args) => {
  return setTimeout(fn, 0, ...args);
};
