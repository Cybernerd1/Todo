import api from './client';

export const login = (email, password) => {
  return api.post('/auth/login', { email, password });
//   console.log('login');
};

export const register = (email, password) => {
  return api.post('/auth/register', { email, password });
//   console.log('register');
};
