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
  params?: { keyword: string; startNum: number; endNum: number; publishman: string };
}

export interface KeywordModelType {
  namespace: string;
  state: StateType;
  effects: {
    // login: Effect;
    // logout: Effect;
    setParams: Effect;
  };
  reducers: {
    changeKeywordParams: Reducer<StateType>;
  };
}

const Model: KeywordModelType = {
  namespace: 'keyword',
  state: {
    params: undefined,
  },

  effects: {
    *setParams({ payload }, { call, put }) {
      console.log(payload, 'keyword====');
      yield put({
        type: 'changeKeywordParams',
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
    changeKeywordParams(state, { payload }) {
      console.log(payload, 'keyword====changeKeywordParams');
      setAuthority(payload.currentAuthority);
      return {
        ...state,
        status: payload.status,
        type: payload.type,
        params: payload.params,
      };
    },
  },
};

export default Model;
