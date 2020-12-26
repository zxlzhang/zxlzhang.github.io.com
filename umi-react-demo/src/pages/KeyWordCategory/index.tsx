import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Row, Col, Form, Button, Input, Table, Avatar, InputNumber } from 'antd';
import { useIntl, FormattedMessage } from 'umi';
// import styles from './Welcome.less';
// import styles from './Content.less';

// const CodePreview: React.FC<{}> = ({ children }) => (
//   <pre className={styles.pre}>
//     <code>
//       <Typography.Text copyable>{children}</Typography.Text>
//     </code>
//   </pre>
// );

const KeyWordCategory = () => {
  const [selectionType, setSelectionType] = useState('checkbox');
  const intl = useIntl();
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

  // rowSelection object indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys: any, selectedRows: any) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record: any) => ({
      // disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name,
    }),
  };

  return (
    <PageContainer>
      <Card>
        <Form>
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
            <Input placeholder="请输入关键词" />
            <span style={{ color: 'rgba(0,0,0,0.45)', fontSize: '12px' }}>
              该关键词删除后，文章将迁移到新的关键词
            </span>
          </Col>
          <Col span={8} offset={1}>
            <Button type="primary">删除关键词</Button>
          </Col>
        </Row>
      </Card>
      <Card style={{ marginTop: '24px' }}>
        <Table
          rowSelection={{
            type: selectionType,
            ...rowSelection,
          }}
          columns={columns}
          dataSource={data}
        />
      </Card>
    </PageContainer>
  );
};
export default KeyWordCategory;
