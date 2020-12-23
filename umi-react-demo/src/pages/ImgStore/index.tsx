import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import {
  Card,
  Alert,
  Typography,
  Image,
  Row,
  Col,
  Form,
  Button,
  DatePicker,
  List,
  Avatar,
  Radio,
} from 'antd';
import { useIntl, FormattedMessage } from 'umi';
import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons';

// import styles from './Welcome.less';
// import styles from './Content.less';

// const CodePreview: React.FC<{}> = ({ children }) => (
//   <pre className={styles.pre}>
//     <code>
//       <Typography.Text copyable>{children}</Typography.Text>
//     </code>
//   </pre>
// );

const ImgStore = () => {
  const { RangePicker } = DatePicker;
  const intl = useIntl();
  return (
    <PageContainer>
      <Card>
        <Row>
          <Col span={2}>
            <AppstoreOutlined />
            <BarsOutlined />
          </Col>
          <Col span={22}>
            <Form>
              <Row>
                <Col span={8}>
                  <Form.Item>
                    <RangePicker />
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                    <Button type="primary" htmlType="submit">
                      搜索
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Card>
      <Col style={{ margin: '16px 0' }}>
        <Button style={{ 'margin-right': '16px' }} type="primary">
          上传图片
        </Button>
        <Button type="primary">批量删除</Button>
      </Col>
      <Card>
        <List
          itemLayout="horizontal"
          dataSource={[{}]}
          renderItem={(item) => (
            <List.Item extra={<Radio></Radio>}>
              <List.Item.Meta
                avatar={
                  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                }
                title={'title'}
                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
              />
            </List.Item>
          )}
        />
        ,
      </Card>
    </PageContainer>
  );
};

export default ImgStore;
