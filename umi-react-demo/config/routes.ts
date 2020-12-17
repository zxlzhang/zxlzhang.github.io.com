export default [
  {
    path: '/',
    component: '../layouts/BlankLayout',
    routes: [
      {
        path: '/user',
        component: '../layouts/UserLayout',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/login',
          },
        ],
      },
      {
        path: '/',
        component: '../layouts/SecurityLayout',
        routes: [
          {
            path: '/',
            component: '../layouts/BasicLayout',
            authority: ['admin', 'user'],
            routes: [
              // {
              //   path: '/',
              //   redirect: '/welcome',
              // },
              // {
              //   path: '/welcome',
              //   name: 'welcome',
              //   icon: 'smile',
              //   component: './Welcome',
              // },
              {
                path: '/',
                redirect: '/content',
              },
              {
                path: '/content',
                name: 'content',
                icon: 'DesktopOutlined',
                component: './Content',
                // redirect:'/home'
              },
              {
                name: 'img-store',
                icon: 'FileImageOutlined',
                path: '/img-store',
                component: './ImgStore',
              },
              {
                name: 'keyword-category',
                icon: 'TableOutlined',
                path: '/keyword-category',
                component: './KeyWordCategory',
              },
              {
                name: 'recommend',
                icon: 'AlertOutlined',
                path: '/recommend',
                component: './Recommend',
              },
              {
                name: 'user-management',
                icon: 'TeamOutlined',
                path: '/user-management',
                component: './UserManagement',
              },
              {
                path: '/admin',
                name: 'admin',
                icon: 'crown',
                component: './Admin',
                authority: ['admin'],
                routes: [
                  {
                    path: '/admin/sub-page',
                    name: 'sub-page',
                    icon: 'smile',
                    component: './Content',
                    authority: ['admin'],
                  },
                ],
              },
              // {
              //   name: 'list.table-list',
              //   icon: 'table',
              //   path: '/list',
              //   component: './ListTableList',
              // },
              {
                component: './404',
              },
            ],
          },
          {
            component: './404',
          },
        ],
      },
    ],
  },
  {
    component: './404',
  },
];
