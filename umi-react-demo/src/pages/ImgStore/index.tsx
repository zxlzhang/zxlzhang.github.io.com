import React, { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Image, Row, Col, Form, Button, DatePicker, List, Avatar, Radio } from 'antd';
import { useIntl, FormattedMessage, connect, Dispatch, ConnectProps, history, Link } from 'umi';
import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons';
import { Public, Admin } from '@/services';
import { StateType } from '@/models/imgStore';
import { ConnectState } from '@/models/connect';

interface imgtoreProps {
  dispatch: Dispatch;
  imgStoreStateProps: StateType;
  // submitting?: boolean;
}

const ImgStore: React.FC<imgtoreProps> = (props) => {
  const { imgStoreStateProps = {} } = props;
  const { params } = imgStoreStateProps;
  console.log(params, 'params====');

  const [listFlag, setListFlag] = useState(false);
  const [limit, setPagesize] = useState(10);
  const [total, setTotal] = useState(0);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState<Array<{}>>([]);
  const [selectedKeys, setRowKeys] = useState([]);
  const { RangePicker } = DatePicker;
  const intl = useIntl();
  useEffect(() => {
    find();
  }, [limit, offset, params]);
  //获取列表
  const find = () => {
    const obj = {
      limit,
      offset,
      name: (params && params.title) || undefined,
      status: (params && params.status) || undefined,
      date: (params && params.date) || undefined,
      publishman: (params && params.publishman) || undefined,
    };
    setLoading(true);
    Admin.queryImgs(obj)
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

  const onFinish = (values: any) => {
    console.log(values, 'values=====');
    const { dispatch } = props;
    dispatch({
      type: 'imgStore/setParams',
      payload: { params: values },
    });
  };

  const [form] = Form.useForm();
  return (
    <PageContainer>
      <Card>
        <Row>
          <Col span={2}>
            {listFlag ? (
              <span onClick={() => setListFlag(false)}>
                <AppstoreOutlined style={{ fontSize: '30px' }} />
              </span>
            ) : (
              <span onClick={() => setListFlag(true)}>
                <BarsOutlined style={{ fontSize: '30px' }} />
              </span>
            )}
          </Col>
          <Col span={22}>
            <Form form={form} onFinish={onFinish}>
              <Row>
                <Col span={8}>
                  <Form.Item name="date">
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
        <Button style={{ marginRight: '16px' }} type="primary">
          上传图片
        </Button>
        <Button type="primary">批量删除</Button>
      </Col>
      <Card>
        {!listFlag ? (
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
        ) : (
          <Row gutter={[16, 24]}>
            <Col className="gutter-row" span={4}>
              <Image
                width={200}
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              />
            </Col>
            <Col className="gutter-row" span={4}>
              <Image
                width={200}
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              />
            </Col>
            <Col className="gutter-row" span={4}>
              <Image
                width={200}
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              />
            </Col>
            <Col className="gutter-row" span={4}>
              <Image
                width={200}
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              />
            </Col>
            <Col className="gutter-row" span={4}>
              <Image
                width={200}
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              />
            </Col>
            <Col className="gutter-row" span={4}>
              <Image
                width={200}
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              />
            </Col>
            <Col className="gutter-row" span={4}>
              <Image
                width={200}
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              />
            </Col>
          </Row>
        )}
      </Card>
    </PageContainer>
  );
};

export default connect(({ imgStore, loading }: ConnectState) => ({
  universityProps: imgStore,
}))(ImgStore);
