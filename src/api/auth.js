import api from './client';

export const login = (email, password) => {
  api.post('/auth/login', { email, password });
  console.log('login');
};

export const register = (email, password) => {
  api.post('/auth/register', { email, password });
  console.log('register');
};
