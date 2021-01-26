import React, { Component, Suspense, useRef, useCallback, useState, useEffect } from 'react';
import { message, Form, Select, Row, Col, Button, Upload, Card } from 'antd';
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
import { Admin } from '@/services';
import axios from 'axios';
import config from '../../../../config';
import { useIntl, FormattedMessage, connect, Dispatch, ConnectProps, history, Link } from 'umi';
import { StateType } from '@/models/university';
import { ConnectState } from '@/models/connect';
import styles from './index.less';
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
interface universityProps {
  dispatch: Dispatch;
  universityProps: StateType;
  // submitting?: boolean;
}
const PublistUniversity: React.FC<universityProps> = (props) => {
  const [form] = Form.useForm();
  const [schoolOptions, setSchools] = useState([]);
  const [avatarImageUrl, setavatarImageUrl] = useState('');
  const [avatarImageLoading, setavatarImageLoading] = useState(false);
  const [bannerImageUrl, setbannerImageUrl] = useState('');
  const [bannerImageLoading, setbannerImageLoading] = useState(false);
  const [heroImageUrl, setheroImageUrl] = useState('');
  const [heroImageLoading, setheroImageLoading] = useState(false);
  const [summaryContent, setSummary] = useState('');
  const [brochureContent, setBrochure] = useState('');

  // const { universityProps = {} } = props;
  // const { currentItem } = universityProps;
  const currentItem: any = window.sessionStorage.getItem('universityCurrentItem');
  // console.log(JSON.parse(universityCurrentItem), 'JSON.----------universityCurrentItem====');
  useEffect(() => {
    if (currentItem !== 'undefined') {
      initObj(JSON.parse(currentItem));
      console.log(currentItem, 'currentItem===');
    }
  }, [currentItem]);

  const initObj = (currentItem: any) => {
    setavatarImageUrl(currentItem.avatar);
    setbannerImageUrl(currentItem.banner);
    setheroImageUrl(currentItem.hero);
    setSummary(currentItem.summary);
    setBrochure(currentItem.brochure);
    form.setFieldsValue({
      name: currentItem.name,
      summary: currentItem.summary,
      brochure: currentItem.brochure,
      avatar: currentItem.avatar,
      banner: currentItem.banner,
      hero: currentItem.hero,
      eduRanges:
        currentItem.eduRanges && currentItem.eduRanges.length > 0
          ? currentItem.eduRanges.split(',')
          : [] || [],
      tags: currentItem.tags.split(','),
    });
  };

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
  const handleEditorSummary = useCallback(
    debounce((e: any) => {
      console.log(e, '编辑富文本====');
      form.setFieldsValue({ summary: e });
    }, 800),
    [],
  );

  const handleEditorBrochure = useCallback(
    debounce((e: any) => {
      console.log(e, '编辑富文本====');
      form.setFieldsValue({ brochure: e });
    }, 800),
    [],
  );
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
    var formData = new FormData();
    formData.append('file', file.file);
    var CancelToken = axios.CancelToken;
    setavatarImageLoading(true);
    axios({
      timeout: 1000 * 60,
      url: config.actionImgUrl,
      method: 'POST',
      data: formData,
      cancelToken: new CancelToken((c) => {
        //行中断请求
        file.cancel = c;
      }),
      onUploadProgress: (progressEvent) => {
        // 对原生进度事件的处理
        console.log(progressEvent, 'progressEvent======进度');
      },
    })
      .then((response) => {
        setavatarImageLoading(false);
        const { data } = response;
        if (data.data) {
          setavatarImageUrl(`${data.data[0].id}${data.data[0].ext}`);
          form.setFieldsValue({ avatar: `${data.data[0].id}${data.data[0].ext}` });
          // find();
        }
      })
      .catch(() => {
        setavatarImageLoading(false);
      });
  };
  const handleChangeBanner = (file: any) => {
    var formData = new FormData();
    formData.append('file', file.file);
    var CancelToken = axios.CancelToken;
    setbannerImageLoading(true);
    axios({
      timeout: 1000 * 60,
      url: config.actionImgUrl,
      method: 'POST',
      data: formData,
      cancelToken: new CancelToken((c) => {
        //行中断请求
        file.cancel = c;
      }),
      onUploadProgress: (progressEvent) => {
        // 对原生进度事件的处理
        console.log(progressEvent, 'progressEvent======进度');
      },
    })
      .then((response) => {
        setbannerImageLoading(false);
        const { data } = response;
        console.log(response, 'response====');
        if (data.data) {
          setbannerImageUrl(`${data.data[0].id}${data.data[0].ext}`);
          form.setFieldsValue({ banner: `${data.data[0].id}${data.data[0].ext}` });
          // find();
        }
      })
      .catch(() => {
        setbannerImageLoading(false);
      });
  };
  const handleChangeHero = (file: any) => {
    console.log(file, 'file===');
    var formData = new FormData();
    formData.append('file', file.file);
    var CancelToken = axios.CancelToken;
    setheroImageLoading(true);
    axios({
      timeout: 1000 * 60,
      url: config.actionImgUrl,
      method: 'POST',
      data: formData,
      cancelToken: new CancelToken((c) => {
        //行中断请求
        file.cancel = c;
      }),
      onUploadProgress: (progressEvent) => {
        // 对原生进度事件的处理
        console.log(progressEvent, 'progressEvent======进度');
      },
    })
      .then((response) => {
        setheroImageLoading(false);
        const { data } = response;
        console.log(response, 'response====');
        if (data.data) {
          setheroImageUrl(`${data.data[0].id}${data.data[0].ext}`);
          form.setFieldsValue({ hero: `${data.data[0].id}${data.data[0].ext}` });
          // find();
        }
      })
      .catch(() => {
        setheroImageLoading(false);
      });
  };

  const onFinsh = (values: any) => {
    const obj = {
      name: values.name,
      summary: values.summary,
      brochure: values.brochure,
      avatar: values.avatar,
      banner: values.banner,
      hero: values.hero,
      eduRanges: values.eduRanges.length > 0 ? values.eduRanges.join(',') : undefined,
      tags: values.tags.join(','),
    };
    //新增
    if (currentItem == 'undefined') {
      Admin.addSchool(obj).then((res) => {
        console.log(res, 'res=====');
        if (!res.error) {
          history.goBack();
        }
      });
    } else {
      //更新
      Admin.updateSchool(JSON.parse(currentItem).id, obj).then((res) => {
        if (!res.error) {
          history.goBack();
        }
      });
    }
    // return;
  };
  return (
    <div className={styles.urUniversityForm}>
      <Card style={{ backgroundColor: '#f7f7f7', marginBottom: '24px' }}>
        <Row>
          <Col span={2}>示例链接:</Col>
          <Col span={22}>http://www.jia.team/university/1123512.html</Col>
        </Row>
      </Card>
      <ProForm
        form={form}
        name="validate_other"
        onValuesChange={(_, values) => {
          console.log(values);
        }}
        onFinish={(values) => onFinsh(values)}
        submitter={{
          render: ({ form, onSubmit }) => {
            return [];
          },
        }}
      >
        <ProFormText
          name="name"
          label="院校名称"
          rules={[{ required: true, message: '请输入院校名称' }]}
          placeholder="请输入院校名称"
        />
        <Form.Item
          label="方块展示图"
          name="avatar"
          rules={[{ required: true, message: '请上传方块展示图' }]}
        >
          <Upload
            // name="avatar"
            fileList={[]}
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            beforeUpload={beforeUploadAvatar}
            customRequest={handleChangeAvatar}
          >
            {avatarImageUrl ? (
              <img src={avatarImageUrl} alt="avatar" style={{ width: '100%' }} />
            ) : (
              uploadAvatarButton
            )}
          </Upload>
          {/* <span style={{ color: '#d9d9d9' }}>移动端院校详情页Banner图，推荐规格375*225</span> */}
        </Form.Item>
        <Form.Item
          label="横幅展示图"
          name="banner"
          rules={[{ required: true, message: '请上传横幅展示图' }]}
        >
          <Upload
            // name="banner"
            listType="picture-card"
            className="avatar-uploader"
            fileList={[]}
            showUploadList={false}
            // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            beforeUpload={beforeUploadBanner}
            customRequest={handleChangeBanner}
          >
            {bannerImageUrl ? (
              <img src={bannerImageUrl} alt="avatar" style={{ width: '100%' }} />
            ) : (
              uploadBannerButton
            )}
          </Upload>
          {/* <span style={{ color: '#d9d9d9' }}>PC端院校详情页Banner图，推荐规格1440*290</span> */}
        </Form.Item>
        <Form.Item
          label="首页展示大图"
          name="hero"
          rules={[{ required: true, message: '请上传首页展示大图' }]}
        >
          <Upload
            // name="hero"
            listType="picture-card"
            className="avatar-uploader"
            fileList={[]}
            showUploadList={false}
            // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            beforeUpload={beforeUploadHero}
            customRequest={handleChangeHero}
          >
            {heroImageUrl ? (
              <img src={heroImageUrl} alt="avatar" style={{ width: '100%' }} />
            ) : (
              uploadHeroButton
            )}
          </Upload>
        </Form.Item>
        <ProFormCheckbox.Group
          name="eduRanges"
          label="学历范围"
          rules={[{ required: false, message: '请选择学历范围' }]}
          options={[
            {
              label: '学信网',
              value: '学信网',
            },
            {
              label: '在职研究生',
              value: '在职研究生',
            },
            {
              label: '定向招生',
              value: '定向招生',
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
          name="summary"
          label="学院简介"
          rules={[{ required: true, message: '请输入学院简介' }]}
        >
          <UrEditor
            id={'summary'}
            content={summaryContent}
            handleEditorChange={handleEditorSummary}
          ></UrEditor>
        </Form.Item>
        <Form.Item
          name="brochure"
          label="招生简章"
          rules={[{ required: true, message: '请输入招生简章' }]}
        >
          <UrEditor
            id={'brochure'}
            content={brochureContent}
            handleEditorChange={handleEditorBrochure}
          ></UrEditor>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ marginRight: '10px' }}>
            提交
          </Button>

          <Button
            htmlType="reset"
            onClick={() => {
              history.goBack();
            }}
          >
            返回
          </Button>
        </Form.Item>
      </ProForm>
    </div>
  );
};

export default connect(({ university, loading }: ConnectState) => ({
  universityProps: university,
}))(PublistUniversity);
