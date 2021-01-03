import React, { Component, Suspense, useRef, useCallback, useState } from 'react';
import { message, Form, Select, Row, Col, Button, Upload } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import UrEditor from '../../components/UrEditor';
import ProForm, {
  ProFormSwitch,
  ProFormText,
  ProFormRadio,
  ProFormCheckbox,
  ProFormRate,
  ProFormDatePicker,
  ProFormSelect,
  ProFormDigit,
  ProFormDateTimePicker,
  ProFormSlider,
  ProFormDateTimeRangePicker,
  ProFormDateRangePicker,
  ProFormUploadButton,
  ProFormUploadDragger,
  ProFormFieldSet,
} from '@ant-design/pro-form';
import debounce from 'lodash.debounce';
import styles from './index.less';
import { Public, Admin } from '@/services';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};
const PublishAticles = () => {
  const [schoolOptions, setSchools] = useState([]);
  const [avatarImageUrl, setavatarImageUrl] = useState('');
  const [avatarImageLoading, setavatarImageLoading] = useState(false);
  const [bannerImageUrl, setbannerImageUrl] = useState('');
  const [bannerImageLoading, setbannerImageLoading] = useState(false);
  const [heroImageUrl, setheroImageUrl] = useState('');
  const [heroImageLoading, setheroImageLoading] = useState(false);

  const onSearchName = useCallback(
    debounce((e: any) => {
      initShools(e);
    }, 800),
    [],
  );

  const initShools = (e: any) => {
    const obj = {
      name: e || undefined,
    };
    Admin.querySchools(obj)
      .then((res) => {
        if (!res.error) {
          setSchools(
            res.data.rows.map((el: any) => {
              return { ...el, label: el.name, value: el.id };
            }),
          );
        }
      })
      .catch(() => {});
  };

  const handleEditorChange = (e: any) => {
    console.log(e, '编辑富文本====');
  };
  const { Option } = Select;
  const uploadAvatarButton = (
    <div>
      {avatarImageLoading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const uploadBannerButton = (
    <div>
      {bannerImageLoading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const uploadHeroButton = (
    <div>
      {heroImageLoading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const beforeUploadAvatar = (file: any) => {
    // console.log(file, 'file===');
    return file;
  };
  const beforeUploadBanner = (file: any) => {
    console.log(file, 'file===');
    return file;
  };
  const beforeUploadHero = (file: any) => {
    console.log(file, 'file===');
    return file;
  };

  const handleChangeAvatar = (file: any) => {
    console.log(file.file, 'file===handleChangeAvatar===');
    Admin.uploadMedia({ file: file.file }).then((res) => {
      console.log(res, 'res===');
    });
  };
  const handleChangeBanner = (file: any) => {
    console.log(file, 'file===');
  };
  const handleChangeHero = (file: any) => {
    console.log(file, 'file===');
  };

  const onsubmit = (values: any) => {
    console.log(values, 'values====onSubmit====');
    const obj = {
      title: values.title || undefined,
      content: values.content || undefined,
      avatar: values.avatar || undefined,
      banner: values.banner || undefined,
      hero: values.hero || undefined,
      tags: (values.tags && values.tags.join(',')) || undefined,
    };
    Admin.addAticle(obj).then((res) => {
      if (!res.error) {
        message.success('操作成功');
        history.back();
      }
    });
  };

  return (
    <div className={styles.urUniversityForm}>
      <ProForm
        name="validate_other"
        onValuesChange={(_, values) => {
          console.log(values);
        }}
        onFinish={async (value) => onsubmit(value)}
        submitter={{
          render: ({ form, onSubmit }) => {
            return [];
          },
        }}
      >
        {/* <ProFormSelect
          showSearch
          name="select"
          label="院校"
          fieldProps={{
            onSearch: onSearchName,
            options: schoolOptions,
          }}
          // valueEnum={{
          //   china: 'China',
          //   usa: 'U.S.A',
          // }}
          placeholder="请输入院校"
          rules={[{ required: true, message: '请输入院校' }]}
        ></ProFormSelect> */}
        <ProFormText
          name="title"
          label="新闻标题"
          rules={[{ required: true, message: '请输入新闻标题' }]}
          placeholder="请输入新闻标题"
        />
        {/* <ProFormCheckbox.Group
          name="checkbox-group"
          label="院校类型"
          options={['211/985', '双一流']}
          rules={[{ required: true, message: '请选择院校类型' }]}
        /> */}
        {/* <Form.Item
          label="方块展示图"
          name="avatar"
          rules={[{ required: true, message: '请上传方块展示图' }]}
        >
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            beforeUpload={beforeUploadAvatar}
            onChange={handleChangeAvatar}
          >
            {avatarImageUrl ? (
              <img src={avatarImageUrl} alt="avatar" style={{ width: '100%' }} />
            ) : (
              uploadAvatarButton
            )}
          </Upload>
          <span style={{ color: '#d9d9d9' }}>移动端院校详情页Banner图，推荐规格375*225</span>
        </Form.Item>
        <Form.Item
          label="横幅展示图"
          name="banner"
          rules={[{ required: true, message: '请上传横幅展示图' }]}
        >
          <Upload
            name="banner"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            beforeUpload={beforeUploadBanner}
            onChange={handleChangeBanner}
          >
            {bannerImageUrl ? (
              <img src={bannerImageUrl} alt="avatar" style={{ width: '100%' }} />
            ) : (
              uploadBannerButton
            )}
          </Upload>
          <span style={{ color: '#d9d9d9' }}>PC端院校详情页Banner图，推荐规格1440*290</span>
        </Form.Item>
        <Form.Item
          label="首页展示大图"
          name="hero"
          rules={[{ required: true, message: '请上传首页展示大图' }]}
        >
          <Upload
            name="hero"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            beforeUpload={beforeUploadHero}
            onChange={handleChangeHero}
          >
            {heroImageUrl ? (
              <img src={heroImageUrl} alt="avatar" style={{ width: '100%' }} />
            ) : (
              uploadHeroButton
            )}
          </Upload>
        </Form.Item> */}
        {/* <ProFormUploadButton
          name="upload"
          label="移动端Banner"
          max={2}
          action="/upload.do"
          extra="移动端院校详情页Banner图，推荐规格375*225"
          rules={[{ required: true, message: '请上传移动端Banner' }]}
        /> */}
        {/* <ProFormUploadButton
          name="upload"
          label="PC端Banner"
          max={2}
          action="/upload.do"
          extra="PC端院校详情页Banner图，推荐规格1440*290"
          rules={[{ required: true, message: '请上传PC端Banner' }]}
        /> */}
        <ProFormCheckbox.Group
          name="checkbox-group"
          label="文章范围"
          rules={[{ required: true, message: '请选择学历范围' }]}
          options={[
            {
              label: '学信网',
              value: 'a',
            },
            {
              label: '在职研究生',
              value: 'b',
            },
            {
              label: '定向招生',
              value: 'c',
            },
          ]}
        />
        <ProFormSelect
          name="tags"
          label="添加关键词"
          fieldProps={{
            mode: 'tags',
            maxTagTextLength: 6,
          }}
          placeholder="请输入关键词"
          rules={[
            { required: true, message: '请输入关键词', type: 'array' },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (
                  value &&
                  value.filter((el: any) => {
                    return el.length > 6;
                  }).length > 0
                ) {
                  return Promise.reject('关键词最多可设置6个字');
                }
                return Promise.resolve();
              },
            }),
          ]}
        />
        <Form.Item
          name="content"
          label="文章内容"
          rules={[{ required: false, message: '请输入文章内容' }]}
        >
          <UrEditor handleEditorChange={handleEditorChange}></UrEditor>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ marginRight: '10px' }}>
            提交
          </Button>

          <Button
            htmlType="reset"
            onClick={() => {
              history.back();
            }}
          >
            返回
          </Button>
        </Form.Item>
      </ProForm>
    </div>
  );
};

export default PublishAticles;
