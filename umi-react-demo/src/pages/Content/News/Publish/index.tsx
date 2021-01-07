import React, { Component, Suspense, useRef, useCallback, useState, useEffect } from 'react';
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
import { Admin } from '@/services';
import { useIntl, FormattedMessage, connect, Dispatch, ConnectProps, history, Link } from 'umi';
import { StateType } from '@/models/news';
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

interface NewsModelProps {
  dispatch: Dispatch;
  newsProps: StateType;
  // submitting?: boolean;
}
const PublishAticles: React.FC<NewsModelProps> = (props) => {
  const [form] = Form.useForm();
  const [stateContent, setContent] = useState(false);
  const { newsProps = {} } = props;
  // const { currentItem } = newsProps;
  const currentItem: any = window.sessionStorage.getItem('newsCurrentItem');

  useEffect(() => {
    if (currentItem !== 'undefined') {
      initObj(JSON.parse(currentItem));
      console.log(currentItem, 'currentItem===');
    }
  }, [currentItem]);

  const initObj = (currentItem: any) => {
    setContent(currentItem.content);
    form.setFieldsValue({
      title: currentItem.title,
      content: currentItem.content,
      eduRanges:
        currentItem.eduRanges && currentItem.eduRanges.length > 0
          ? currentItem.eduRanges.split(',')
          : [] || [],
      tags: currentItem.tags.split(','),
    });
  };

  const handleEditorChange = useCallback(
    debounce((e: any) => {
      form.setFieldsValue({
        content: e,
      });
      console.log(e, '编辑富文本====');
    }, 800),
    [],
  );
  const { Option } = Select;

  const onsubmit = (values: any) => {
    const obj = {
      title: values.title || undefined,
      content: values.content || undefined,
      eduRanges: values.eduRanges.length > 0 ? values.eduRanges.join(',') : undefined,
      tags: (values.tags && values.tags.join(',')) || undefined,
    };
    if (currentItem == 'undefined') {
      //新增
      Admin.addAticle(obj).then((res) => {
        if (!res.error) {
          message.success('操作成功');
          history.goBack();
        }
      });
    } else {
      //编辑
      Admin.updateAticle(JSON.parse(currentItem).id, obj).then((res) => {
        if (!res.error) {
          message.success('操作成功');
          history.goBack();
        }
      });
    }
  };

  return (
    <div className={styles.urNewsForm}>
      <ProForm
        form={form}
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
        <ProFormText
          name="title"
          label="新闻标题"
          rules={[{ required: true, message: '请输入新闻标题' }]}
          placeholder="请输入新闻标题"
        />
        <ProFormCheckbox.Group
          name="eduRanges"
          label="文章范围"
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
          name="content"
          label="文章内容"
          rules={[{ required: true, message: '请输入文章内容' }]}
        >
          <UrEditor content={stateContent} handleEditorChange={handleEditorChange}></UrEditor>
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

export default connect(({ news, loading }: ConnectState) => ({
  newsProps: news,
}))(PublishAticles);
