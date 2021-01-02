import React, { Component, Suspense, useRef, useCallback, useState } from 'react';
import { message, Form, Switch, Select, Row, Col, Button } from 'antd';
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
const PublistUniversity = () => {
  const [schoolOptions, setSchools] = useState([]);

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
  return (
    <div className={styles.urUniversityForm}>
      <ProForm
        name="validate_other"
        onValuesChange={(_, values) => {
          console.log(values);
        }}
        onFinish={async (value) => console.log(value)}
      >
        <ProFormSelect
          // {...layout}
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
        >
          <Option value="1">Not Identified</Option>
        </ProFormSelect>
        <ProFormCheckbox.Group
          name="checkbox-group"
          label="院校类型"
          options={['211/985', '双一流']}
          rules={[{ required: true, message: '请选择院校类型' }]}
        />
        <ProFormUploadButton
          name="upload"
          label="移动端Banner"
          max={2}
          action="/upload.do"
          extra="移动端院校详情页Banner图，推荐规格375*225"
          rules={[{ required: true, message: '请上传移动端Banner' }]}
        />
        <ProFormUploadButton
          name="upload"
          label="PC端Banner"
          max={2}
          action="/upload.do"
          extra="PC端院校详情页Banner图，推荐规格1440*290"
          rules={[{ required: true, message: '请上传PC端Banner' }]}
        />
        <ProFormCheckbox.Group
          name="checkbox-group"
          label="学历范围"
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
        {/* <ProFormRadio.Group
          name="radio"
          label="学历范围"
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
        /> */}
        <ProFormSelect
          name="keywords"
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
        <Form.Item name="content" label="学院简介" required={true}>
          <UrEditor handleEditorChange={handleEditorChange}></UrEditor>
        </Form.Item>
        <Form.Item name="content" label="招生简章" required={true}>
          <UrEditor handleEditorChange={handleEditorChange}></UrEditor>
        </Form.Item>
      </ProForm>
    </div>
  );
};

export default PublistUniversity;
