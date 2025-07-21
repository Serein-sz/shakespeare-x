import {createAlova} from 'alova';
import fetchAdapter from 'alova/fetch';
import vueHook from 'alova/vue';
import {createApis, withConfigType} from './createApis';
import {toast} from 'vue-sonner'
import type {ApiResponse} from "@/api/globals";
import {createClientTokenAuthentication} from "alova/client";

const {onAuthRequired, onResponseRefreshToken}
  = createClientTokenAuthentication<typeof vueHook>({
  refreshToken: {
    // 在请求前触发，将接收到method参数，并返回boolean表示token是否过期
    isExpired: method => {
      if (method.url.includes("/auth")) {
        return false;
      }
      const token = localStorage.getItem('token');
      if (!token) {
        return false;
      }
      const payload = JSON.parse(atob(token.split(".")[1])) as { sub: string, exp: number };
      return payload.exp * 1000 < Date.now();
    },

    // 当token过期时触发，在此函数中触发刷新token
    handler: async _method => {
      // try {
      //   const {token, refresh_token} = await refreshToken();
      //   localStorage.setItem('token', token);
      //   localStorage.setItem('refresh_token', refresh_token);
      // } catch (error) {
      //   // token刷新失败，跳转回登录页
      //   location.href = '/login';
      //   // 并抛出错误
      //   throw error;
      // }
    }
  }
});


export const alovaInstance = createAlova({
  baseURL: 'http://192.168.2.17:8000',
  statesHook: vueHook,
  requestAdapter: fetchAdapter(),
  cacheFor: null,
  beforeRequest: onAuthRequired(method => {
    const headers = method.config.headers;
    headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  }),
  responded: onResponseRefreshToken({
    onSuccess: async (response): Promise<ApiResponse> => {
      if (response.status === 401) {
        return Promise.reject(response.statusText);
      }
      if (response.status >= 400) {
        throw new Error(response.statusText);
      }
      const json = await response.json();
      if (json.code !== 200) {
        toast.error(json.message);
        return Promise.reject(json.message);
      }
      return json.data;
    },
    onError: (err) => {
      toast.error(err.message);
    },
  })
});

export const $$userConfigMap = withConfigType({});

const Apis = createApis(alovaInstance, $$userConfigMap);

export default Apis;
