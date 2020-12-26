import { PageContainer } from '@ant-design/pro-layout';
import React, { Component, Suspense, useRef, useCallback, useState } from 'react';
import { Typography, Button, Tag, Space, Table, Row, Col, Select } from 'antd';
import { useIntl, FormattedMessage, connect, Dispatch, ConnectProps, history, Link } from 'umi';
import ProTable, { ProColumns, TableDropdown, ActionType } from '@ant-design/pro-table';
import debounce from 'lodash.debounce';
import request from 'umi-request';
import { Admin, Public } from '../serviceApi';

import moment from 'moment';
import styles from './index.less';
interface GithubIssueItem {
  url: string;
  id: number;
  number: number;
  title: string;
  labels: {
    name: string;
    color: string;
  }[];
  state: string;
  comments: number;
  created_at: string;
  updated_at: string;
  closed_at?: string;
}

const University = () => {
  const [universityList, setUniversity] = useState([]);
  const [pageSize, setPagesize] = useState(10);
  const [total, setTotal] = useState(0);
  const [selectedKeys, setRowKeys] = useState([]);
  const columns: ProColumns<GithubIssueItem>[] = [
    {
      dataIndex: 'title',
      // // valueType: 'select',
      //   hideInTable: true,,
      title: '院校',
      // valueEnum: {},
      renderFormItem: (item, { defaultRender }) => {
        return (
          <Select
            showSearch
            placeholder={'请输入院校'}
            // style={this.props.style}
            defaultActiveFirstOption={false}
            showArrow={false}
            filterOption={false}
            onSearch={handleChangeTitle}
            // onChange={handleChangeTitle}
            notFoundContent={null}
          >
            {universityList}
          </Select>
        );
      },
    },
    {
      dataIndex: 'publishman',
      valueType: 'select',
      title: '发布者',
    },
    {
      dataIndex: 'date',
      title: '日期',
      valueType: 'date',
    },
    {
      dataIndex: 'status',
      valueType: 'select',
      title: '发布状态',
      valueEnum: {
        all: { text: '全部' },
        yes: { text: '已上线' },
        no: { text: '未上线' },
        unknow: { text: '未知' },
      },
      renderFormItem: (_, { defaultRender }) => {
        return defaultRender(_);
      },
      render: (_, record) => (
        <Space>
          {record.labels.map(({ name, color }) => (
            <Tag color={color} key={name}>
              {name}
            </Tag>
          ))}
        </Space>
      ),
    },
    {
      title: '操作',
      valueType: 'option',
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            return onEditor(record);
          }}
        >
          编辑
        </a>,
      ],
    },
  ];

  const handleChangeTitle = useCallback(
    debounce((e: any) => {
      console.log(e, 'e====变化院校==');
    }, 800),
    [],
  );
  const onEditor = (record: any) => {
    console.log('编辑', record);
  };

  const goOnLine = () => {
    console.log('点击批量上线', selectedKeys);
  };

  const goOutLine = () => {
    console.log('批量下线');
  };

  const onMutipleDel = () => {
    console.log('批量删除');
  };

  const onSubmit = (e: any) => {
    console.log(e, '提交表单');
  };

  const onSelectedRowKeys = (rowKeys: any, rows: any) => {
    setRowKeys(rowKeys);
    console.log(rowKeys, '选择多选框', rows);
  };

  const onChangePage = (current: any, pageSize: any) => {
    console.log(current, '变化页面', pageSize);
  };

  const onShowSizeChange = (current: any, pageSize: any) => {
    console.log(current, '变化条数', pageSize);
  };
  // render() {
  // const { registerUser, accessUser } = this.state;
  const actionRef = useRef<ActionType>();

  const { Paragraph } = Typography;
  return (
    <PageContainer>
      <Row>
        <Col className={styles.urUniversity}>
          <Button type="primary" onClick={goOnLine}>
            批量上线
          </Button>
          <Button type="primary" onClick={goOutLine}>
            批量下线
          </Button>
          <Button type="primary" onClick={onMutipleDel}>
            批量删除
          </Button>
          <Button type="primary">
            <Link to="/content/university/publish"> 发布院校</Link>
          </Button>
        </Col>
      </Row>
      <ProTable<GithubIssueItem>
        columns={columns}
        rowSelection={{
          // 自定义选择项参考: https://ant.design/components/table-cn/#components-table-demo-row-selection-custom
          // 注释该行则默认不显示下拉选项
          selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
          onChange: (selectedRowKeys, selectedRows) => {
            onSelectedRowKeys(selectedRowKeys, selectedRows);
          },
        }}
        actionRef={actionRef}
        onSubmit={onSubmit}
        request={async (params = {}) =>
          request<{
            data: GithubIssueItem[];
          }>('https://proapi.azurewebsites.net/github/issues', {
            params,
          })
        }
        editable={{
          type: 'multiple',
        }}
        rowKey="id"
        search={{
          labelWidth: 'auto',
          defaultCollapsed: false,
        }}
        pagination={{
          pageSize: pageSize,
          total: total,
          onChange: onChangePage,
          onShowSizeChange: onShowSizeChange,
        }}
        dateFormatter="string"
      />
    </PageContainer>
  );
  // }
};

export default University;
