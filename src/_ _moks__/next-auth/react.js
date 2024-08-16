// __mocks__/next-auth/react.js

const useSessionMock = jest.fn(() => ({
  data: null, // or provide mock session data here
  status: 'authenticated', // or 'authenticated'
}));

const signInMock = jest.fn();
const signOutMock = jest.fn();

module.exports = {
  useSession: useSessionMock,
  signIn: signInMock,
  signOut: signOutMock,
};
