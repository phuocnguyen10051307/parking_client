import api from '@/lib/api';

import { normalizeAuthUser } from '../utils/auth-util';
import type { AuthSession, MeResponse, SigninResponse } from '../types/auth.types';

export type SigninRequest = {
  email: string;
  password: string;
};

export type SignupRequest = {
  email: string;
  otpCode: string;
};

export type RequestSignupOtpRequest = {
  fullName: string;
  email: string;
  password: string;
  phone?: string;
};

export const authApi = {
  signin: async (data: SigninRequest): Promise<AuthSession> => {
    const res = await api.post<SigninResponse>('/auth/signin', data);
    const session = res.data.data;

    return {
      user: normalizeAuthUser(session.user),
    };
  },

  requestSignupOtp: async (data: RequestSignupOtpRequest) => {
    const res = await api.post('/auth/signup/request-otp', data);
    return res.data;
  },

  signup: async (data: SignupRequest) => {
    const res = await api.post('/auth/signup', data);
    return res.data;
  },

  me: async () => {
    const res = await api.get<MeResponse>('/auth/me');
    return normalizeAuthUser(res.data.user);
  },

  signout: async () => {
    const res = await api.post('/auth/signout');
    return res.data;
  },

  refreshToken: async () => {
    const res = await api.post(
      '/auth/refresh-token',
      {},
      {
        withCredentials: true,
      }
    );
    return res.data;
  },
};


