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
                // exact: true,
                // routes: [

                // ],
                // redirect:'/home'
              },
              {
                path: '/content/university',
                name: 'content-university',
                component: './Content/University',
                hideInMenu: true,
              },
              {
                path: '/content/university/publish',
                name: 'content-university-publish',
                component: './Content/University/Publish',
                hideInMenu: true,
              },
              {
                path: '/content/service',
                name: 'content-service',
                component: './Content/Service',
                hideInMenu: true,
              },
              {
                path: '/content/service/publish',
                name: 'content-service-publish',
                component: './Content/Service/Publish',
                hideInMenu: true,
              },
              {
                path: '/content/news',
                name: 'content-news',
                component: './Content/News',
                hideInMenu: true,
              },
              {
                path: '/content/news/publish',
                name: 'content-news-publish',
                component: './Content/News/Publish',
                hideInMenu: true,
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
                component: './404',
                // component: './Recommend',
              },
              {
                name: 'user-management',
                icon: 'TeamOutlined',
                path: '/user-management',
                component: './404',
                // component: './UserManagement',
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
