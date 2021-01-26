import { MenuDataItem, Settings as ProSettings } from '@ant-design/pro-layout';
import { GlobalModelState } from './global';
import { UserModelState } from './user';
import { StateType } from './login';
import { UniversityStateType } from './university';
import { ServicesBusinessStateType } from './serviceBusiness';
import { NewsStateType } from './serviceBusiness';
import { ImgStoreType } from './imgStore';
import { KeyWordsType } from './keywords';

export { GlobalModelState, UserModelState };

export interface Loading {
  global: boolean;
  effects: { [key: string]: boolean | undefined };
  models: {
    global?: boolean;
    menu?: boolean;
    setting?: boolean;
    user?: boolean;
    login?: boolean;
    university?: boolean;
    services?: boolean;
    news?: boolean;
    imgStore?: boolean;
    keyword?: boolean;
  };
}

export interface ConnectState {
  global: GlobalModelState;
  loading: Loading;
  settings: ProSettings;
  user: UserModelState;
  login: StateType;
  university: UniversityStateType;
  services: ServicesBusinessStateType;
  news: NewsStateType;
  imgStore: ImgStoreType;
  keyword: KeyWordsType;
}

export interface Route extends MenuDataItem {
  routes?: Route[];
}
