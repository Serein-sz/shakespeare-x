import {createAlova} from 'alova';
import fetchAdapter from 'alova/fetch';
import vueHook from 'alova/vue';
import {createApis, withConfigType} from './createApis';
import {toast} from 'vue-sonner'

export const alovaInstance = createAlova({
  baseURL: 'http://localhost:8000',
  statesHook: vueHook,
  requestAdapter: fetchAdapter(),
  beforeRequest: method => {
  },
  responded: {
    onSuccess: async (response, method) => {
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

    onError: (err, method) => {
      toast.error(err.message);
    },

    onComplete: async method => {
    }
  }
});

export const $$userConfigMap = withConfigType({});

const Apis = createApis(alovaInstance, $$userConfigMap);

export default Apis;
