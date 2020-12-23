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
  const onSearchName = useCallback(
    debounce((e: any) => {
      console.log(e, '搜索学校');
    }, 800),
    [],
  );

  const handleEditorChange = (e: any) => {
    console.log(e, '编辑富文本====');
  };

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
          {...layout}
          showSearch
          name="select"
          label="院校"
          fieldProps={{
            onSearch: onSearchName,
          }}
          valueEnum={{
            china: 'China',
            usa: 'U.S.A',
          }}
          placeholder="请输入院校"
          rules={[{ required: true, message: '请输入院校' }]}
        />
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
        <ProFormRadio.Group
          name="radio"
          label="文章类型"
          rules={[{ required: true, message: '请选择文章类型' }]}
          options={[
            {
              label: '学院简介',
              value: 'a',
            },
            {
              label: '招生简章',
              value: 'b',
            },
          ]}
        />
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
        <Form.Item name="content" label="发布内容" required={true}>
          <UrEditor handleEditorChange={handleEditorChange}></UrEditor>
        </Form.Item>
      </ProForm>
    </div>
  );
};

export default PublistUniversity;
