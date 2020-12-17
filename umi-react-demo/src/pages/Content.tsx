import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Alert, Typography, Tag, Row, Col, Statistic, Button } from 'antd';
import { useIntl, FormattedMessage } from 'umi';
// import styles from './Welcome.less';
import styles from './Content.less';

// const CodePreview: React.FC<{}> = ({ children }) => (
//   <pre className={styles.pre}>
//     <code>
//       <Typography.Text copyable>{children}</Typography.Text>
//     </code>
//   </pre>
// );

export default (): React.ReactNode => {
  const intl = useIntl();
  return (
    <PageContainer>
      <Row gutter={[16, 16]}>
        <Col span={6} className={styles.urContentStatistic}>
          <Statistic value={112893} />
          <p>今日新增注册用户</p>
        </Col>
        <Col span={6} className="ur-content__statistic">
          <Statistic value={112893} precision={2} />
          <p>今日访问用户量</p>
        </Col>
      </Row>
      {/*       
      <Card title="Default size card" extra={<a href="#">More</a>} style={{ width: 300 }}>
        <Tag color="magenta">内容</Tag>
      </Card> */}
    </PageContainer>
  );
};
