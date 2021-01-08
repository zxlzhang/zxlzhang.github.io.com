import React, { useState, useEffect, useCallback } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Row, Col, Form, Button, Input, Table, Avatar, InputNumber, Pagination } from 'antd';
import { useIntl, FormattedMessage, Dispatch, connect } from 'umi';
import { Admin } from '@/services';
import debounce from 'lodash.debounce';
import { StateType } from '@/models/keywords';
import { ConnectState } from '@/models/connect';

interface keyWordCategoryProps {
  dispatch: Dispatch;
  keywordsProps: StateType;
  // submitting?: boolean;
}

const KeyWordCategory: React.FC<keyWordCategoryProps> = (props) => {
  const { keywordsProps = {} } = props;
  const { params } = keywordsProps;
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [offset, setOffset] = useState(0);
  const [pagesize, setPageSize] = useState(1);
  const [loading, setLoading] = useState(false);

  const [dataSource, setDataSource] = useState<Array<{ id: number }>>([]);
  const [selectedKeys, setRowKeys] = useState([]);
  const [replaceWord, setReplaceWord] = useState('');
  const [stateParams, setStateParams] = useState<any>({});
  const intl = useIntl();

  useEffect(() => {
    find();
  }, [limit, offset, stateParams]);
  //获取列表
  const find = () => {
    const obj = {
      limit,
      offset,
      name: (stateParams && stateParams.keyword) || undefined,
      startNameLength: (stateParams && stateParams.startNum) || undefined,
      endNameLength: (stateParams && stateParams.endNum) || undefined,
      // startTime: (params && params.date && params.date[0]) || undefined,
      // endTime: (params && params.date && params.date[1]) || undefined,
    };
    setLoading(true);
    Admin.queryTags(obj)
      .then((res) => {
        setLoading(false);
        if (!res.error) {
          setDataSource([...res.data.rows]);
          setTotal(res.data.count);
        }
      })
      .catch(() => {
        setLoading(false);
      });
  };

  console.log(params, 'params====');
  const columns = [
    {
      title: '标签',
      dataIndex: 'name',
      render: (text: any) => <a>{text}</a>,
    },
    {
      title: '文章数量',
      dataIndex: 'age',
    },
  ];
  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
    {
      key: '4',
      name: 'Disabled User',
      age: 99,
      address: 'Sidney No. 1 Lake Park',
    },
  ];

  const onFinish = (values: any) => {
    console.log(values, 'values=====');
    setStateParams(values);
    const { dispatch } = props;
    dispatch({
      type: 'keyword/setParams',
      payload: { params: values },
    });
  };
  //变化可迁移的关键词
  const changeWord = useCallback(
    debounce((e: any) => {
      setReplaceWord(e.target.value);
    }, 800),
    [],
  );
  //删除迁移关键词
  const onReplace = () => {};

  // rowSelection object indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys: any, selectedRows: any) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      setRowKeys(selectedRowKeys);
    },
    getCheckboxProps: (record: any) => ({
      // disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name,
    }),
    selectedRowKeys: selectedKeys,
  };
  const [form] = Form.useForm();
  const onChangePage = (page: any, pageSize: any) => {
    setOffset(page - 1);
    setPageSize(page);
    setLimit(pageSize);
  };

  const onShowSizeChange = (current: any, pageSize: any) => {
    console.log(current, pageSize);
    setOffset(current);
    setLimit(pageSize);
  };

  return (
    <PageContainer>
      <Card>
        <Form form={form} onFinish={onFinish}>
          <Row>
            <Col span={8}>
              <Form.Item name="keyword" label="关键词">
                <Input placeholder="请输入关键词" />
              </Form.Item>
            </Col>
            <Col span={16}>
              <Row>
                <Col span={12} offset={2}>
                  <Row>
                    <Col span={5} style={{ lineHeight: '32px' }}>
                      关键词长度:
                    </Col>
                    <Col span={8}>
                      <Form.Item name="startNum">
                        <InputNumber
                          placeholder="起始长度"
                          min={1}
                          max={10}
                          style={{ width: '100%' }}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={2} style={{ lineHeight: '32px', textAlign: 'center' }}>
                      到
                    </Col>
                    <Col span={8}>
                      <Form.Item name="endNum">
                        <InputNumber
                          placeholder="终止长度"
                          min={1}
                          max={10}
                          style={{ width: '100%' }}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>
                <Col span={10}>
                  <Form.Item wrapperCol={{ span: 12, offset: 4 }}>
                    <Button type="primary" htmlType="submit">
                      搜索
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Col>
          </Row>
        </Form>
        <Row>
          <Col span={8}>
            <Input placeholder="请输入关键词" onChange={changeWord} />
            <span style={{ color: 'rgba(0,0,0,0.45)', fontSize: '12px' }}>
              该关键词删除后，文章将迁移到新的关键词
            </span>
          </Col>
          <Col span={8} offset={1}>
            <Button
              type="primary"
              disabled={selectedKeys.length > 0 && !replaceWord == false ? false : true}
              onClick={onReplace}
            >
              删除并迁移关键词
            </Button>
          </Col>
        </Row>
      </Card>
      <Card style={{ marginTop: '24px' }}>
        <Table
          rowKey={(record) => record.id}
          rowSelection={{
            // type: selectionType,
            ...rowSelection,
          }}
          loading={loading}
          columns={columns}
          dataSource={dataSource}
          pagination={false}
        />
        <Row>
          <Col span={24} style={{ textAlign: 'right', paddingTop: '12px' }}>
            <Pagination
              showSizeChanger
              onShowSizeChange={onShowSizeChange}
              onChange={onChangePage}
              current={pagesize}
              total={total}
            />
          </Col>
        </Row>
      </Card>
    </PageContainer>
  );
};
// export default KeyWordCategory;

export default connect(({ keyword, loading }: ConnectState) => ({
  keywordsProps: keyword,
}))(KeyWordCategory);
