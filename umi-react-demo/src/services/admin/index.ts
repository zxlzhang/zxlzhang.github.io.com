import request from '@/utils/request';

async function addAticle(params: any) {
  return request('/admin/article/add', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

async function updateAticle(id: number | string, params: any) {
  return request(`/admin/article/update/${id}`, {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

async function publishAticle(id: number | string, params: any) {
  return request(`/admin/article/publish/${id}`, {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

async function taggingArticle(id: number | string, params: any) {
  return request(`/admin/article/tagging/${id}`, {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

async function addTag(name: number | string, params: any) {
  return request(`/admin/tag/findOrAdd/${name}`, {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

async function uploadMedia(params: any) {
  return request(`/admin/media/upload`, {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

async function addSchool(params: any) {
  return request(`/admin/school/add`, {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

async function updateSchool(id: number | string, params: any) {
  return request(`/admin/school/update/${id}`, {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

async function publishSchool(params: { isPublished: string; ids: string }) {
  return request(`/admin/school/publish`, {
    method: 'POST',
    data: {
      ...params,
      // method: 'post',
    },
  });
}

async function removeSchool(params: { ids: string }) {
  return request(`/admin/school/delete`, {
    method: 'POST',
    data: {
      ...params,
      // method: 'post',
    },
  });
}

async function taggingSchool(id: number | string, params: any) {
  return request(`/admin/school/tagging/${id}`, {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

async function addProfession(name: number | string, params: any) {
  return request(`/admin/profession/findOrAdd/${name}`, {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

async function updateSchoolProfessions(id: number | string, params: any) {
  return request(`/admin/school/profession/update/${id}`, {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

async function setSiteConfig(key: number | string, params: any) {
  return request(`/admin/site-config/${key}`, {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

async function addRule(params: any) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

async function updateRule(params: any) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'update',
    },
  });
}

async function querySchools(params: any) {
  return request(`/school/query`, {
    params,
  });
}

export default {
  addAticle,
  updateAticle,
  publishAticle,
  taggingArticle,
  addTag,
  uploadMedia,
  addSchool,
  updateSchool,
  publishSchool,
  taggingSchool,
  addProfession,
  updateSchoolProfessions,
  setSiteConfig,
  querySchools,
  removeSchool,
};
