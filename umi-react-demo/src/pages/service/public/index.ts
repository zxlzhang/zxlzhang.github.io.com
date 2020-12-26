import request from '@/utils/request';

async function getArticle(id: number | string, params: any) {
  return request(`/article/${id}`, {
    params,
  });
}

async function getArticleTags(id: number | string, params: any) {
  return request(`/article/${id}/tag`, {
    params,
  });
}

async function queryArticles(params: any) {
  return request(`/article/query`, {
    params,
  });
}

async function getSchool(id: number | string, params: any) {
  return request(`/school/${id}`, {
    params,
  });
}

async function getSchoolTags(id: number | string, params: any) {
  return request(`/school/${id}/tag`, {
    params,
  });
}

async function querySchools(params: any) {
  return request(`/school/query`, {
    params,
  });
}

async function getSiteConfig(key: number | string, params: any) {
  return request(`/site-config/${key}`, {
    params,
  });
}

export default {
  getArticle,
  getArticleTags,
  queryArticles,
  getSchool,
  getSchoolTags,
  querySchools,
  getSiteConfig,
};
