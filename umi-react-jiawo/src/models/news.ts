import { stringify } from 'querystring';
import { history, Reducer, Effect } from 'umi';

// import { fakeAccountLogin } from '@/services';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { message } from 'antd';

export interface StateType {
  status?: 'ok' | 'error';
  type?: string;
  currentAuthority?: 'user' | 'guest' | 'admin';
  params?: { title: string; status: string; date: string; publishman: string };
  currentItem?: {
    id: number;
    title: string;
    content: string;
    tags: string;
    eduRanges: string;
  };
}

export interface NewsModelType {
  namespace: string;
  state: StateType;
  effects: {
    // login: Effect;
    // logout: Effect;
    setParams: Effect;
    setCurrentItem: Effect;
  };
  reducers: {
    changeNewsParams: Reducer<StateType>;
  };
}

const Model: NewsModelType = {
  namespace: 'news',

  state: {
    params: undefined,
    currentItem: undefined,
  },

  effects: {
    *setParams({ payload }, { call, put }) {
      console.log(payload, 'payload====');
      yield put({
        type: 'changeNewsParams',
        payload: payload,
      });
    },
    *setCurrentItem({ payload }, { call, put }) {
      console.log(payload, 'payload====');
      yield put({
        type: 'changeNewsParams',
        payload: payload,
      });
    },
    // *login({ payload }, { call, put }) {
    //   const response = yield call(fakeAccountLogin, payload);
    //   yield put({
    //     type: 'changeLoginStatus',
    //     payload: response,
    //   });
    //   // Login successfully
    //   if (response.status === 'ok') {
    //     const urlParams = new URL(window.location.href);
    //     const params = getPageQuery();
    //     message.success('🎉 🎉 🎉  登录成功！');
    //     let { redirect } = params as { redirect: string };
    //     if (redirect) {
    //       const redirectUrlParams = new URL(redirect);
    //       if (redirectUrlParams.origin === urlParams.origin) {
    //         redirect = redirect.substr(urlParams.origin.length);
    //         if (redirect.match(/^\/.*#/)) {
    //           redirect = redirect.substr(redirect.indexOf('#') + 1);
    //         }
    //       } else {
    //         window.location.href = '/';
    //         return;
    //       }
    //     }
    //     history.replace(redirect || '/');
    //   }
    // },
    // logout() {
    //   const { redirect } = getPageQuery();
    //   // Note: There may be security issues, please note
    //   if (window.location.pathname !== '/user/login' && !redirect) {
    //     history.replace({
    //       pathname: '/user/login',
    //       search: stringify({
    //         redirect: window.location.href,
    //       }),
    //     });
    //   }
    // },
  },

  reducers: {
    changeNewsParams(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return {
        ...state,
        status: payload.status,
        type: payload.type,
        params: payload.params,
        currentItem: payload.currentItem,
      };
    },
  },
};

export default Model;
