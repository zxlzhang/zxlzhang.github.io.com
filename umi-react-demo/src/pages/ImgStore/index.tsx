import React, { useState, useEffect, useReducer } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import {
  Card,
  Row,
  Col,
  Form,
  Button,
  DatePicker,
  List,
  Avatar,
  Modal,
  Upload,
  Checkbox,
  Pagination,
  Spin,
} from 'antd';
import { useIntl, FormattedMessage, connect, Dispatch, ConnectProps, history, Link } from 'umi';
import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons';
import { Public, Admin } from '@/services';
import { StateType } from '@/models/imgStore';
import { ConnectState } from '@/models/connect';
import config from '../../config';
import axios from 'axios';
import moment from 'moment';
import { ExclamationCircleOutlined } from '@ant-design/icons';

interface imgtoreProps {
  dispatch: Dispatch;
  imgStoreStateProps: StateType;
  // submitting?: boolean;
}

const ImgStore: React.FC<imgtoreProps> = (props) => {
  const { imgStoreStateProps = {} } = props;
  const { params } = imgStoreStateProps;
  const [listFlag, setListFlag] = useState(false);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [offset, setOffset] = useState(0);
  const [pagesize, setPageSize] = useState(1);
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState<Array<{ id: string; ext: string }>>([]);
  const [selectedKeys, setRowKeys] = useState<Array<string>>([]);
  const [stateParams, setStateParams] = useState<any>({});
  const { RangePicker } = DatePicker;
  const intl = useIntl();
  const { confirm } = Modal;

  // useReducer(() => {
  //   const { dispatch } = props;
  //   dispatch({
  //     type: 'imgStore/setParams',
  //     payload: { params: undefined },
  //   });
  // });
  useEffect(() => {
    // setStateParams(params);
    find();
  }, [limit, offset, stateParams]);
  //获取列表
  const find = () => {
    const obj = {
      limit,
      offset,
      startDate:
        (stateParams &&
          stateParams.date &&
          moment(stateParams.date[0]).format('YYYY-MM-DD HH:mm:ss')) ||
        undefined,
      endDate:
        (stateParams &&
          stateParams.date &&
          moment(stateParams.date[1]).format('YYYY-MM-DD HH:mm:ss')) ||
        undefined,
    };
    setLoading(true);
    Admin.queryImgs(obj)
      .then((res) => {
        setLoading(false);
        if (!res.error) {
          setDataSource([...res.data.rows]);
          setTotal(res.data.count);
          setRowKeys([]);
        }
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const onFinish = (values: any) => {
    console.log(values, 'values=====');
    setStateParams(values);
    const { dispatch } = props;
    dispatch({
      type: 'imgStore/setParams',
      payload: { params: values },
    });
  };

  const uploadProps = {
    name: 'file',
    multiple: true,
    fileList: [],
    customRequest(info: any) {
      console.log(info.file, 'info====');
      const file = info.file;
      const formData = new FormData();
      formData.append('name', info.name);
      formData.append('file', info.file);
      // Admin.uploadMedia(formData).then((res) => {
      //   console.log(res, 'res====');
      // });
      var CancelToken = axios.CancelToken;
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
          const { data } = response;
          console.log(response, 'response====');
          if (data.data) {
            find();
          }
        })
        .catch(() => {});
    },
  };

  const onCheckRadio = (e: any, item: any) => {
    const index = selectedKeys.findIndex((el) => {
      return el == item.id;
    });
    if (index != -1) {
      let list = [...selectedKeys];
      list.splice(index, 1);
      setRowKeys(list);
    } else {
      let list = [...selectedKeys];
      list.push(item.id);
      setRowKeys(list);
    }
  };
  //批量删除
  const onMultipleDel = () => {
    confirm({
      title: `确定删除该图片吗？`,
      icon: <ExclamationCircleOutlined />,
      onOk() {
        Admin.removeImgs({ ids: selectedKeys.join(',') }).then((res) => {
          if (!res.error) {
            find();
          }
        });
      },
      onCancel() {},
    });
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
        <Row>
          <Col span={2}>
            {!listFlag ? (
              <span onClick={() => setListFlag(true)}>
                <AppstoreOutlined style={{ fontSize: '30px' }} />
              </span>
            ) : (
              <span onClick={() => setListFlag(false)}>
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
      <Row style={{ margin: '16px 0' }}>
        <Col span={2}>
          <Upload {...uploadProps}>
            <Button style={{ marginRight: '16px' }} type="primary">
              上传图片
            </Button>
          </Upload>
        </Col>

        <Col span={2}>
          <Button disabled={selectedKeys.length == 0} type="primary" onClick={onMultipleDel}>
            批量删除
          </Button>
        </Col>
      </Row>
      <Card>
        <Spin spinning={loading}>
          {!listFlag ? (
            <List
              itemLayout="horizontal"
              dataSource={dataSource}
              renderItem={(item: { id: string; ext: string }) => (
                <List.Item
                  extra={
                    <Checkbox
                      checked={selectedKeys.findIndex((el) => el == item.id) != -1 ? true : false}
                      onChange={(e) => {
                        onCheckRadio(e, item);
                      }}
                    ></Checkbox>
                  }
                >
                  <List.Item.Meta
                    avatar={<Avatar src={`${item.id}${item.ext}`} />}
                    title={`${item.id}${item.ext}`}
                    // description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                  />
                </List.Item>
              )}
            />
          ) : (
            <Row gutter={[16, 24]}>
              {dataSource.map((item) => (
                <Col className="gutter-row" span={4}>
                  <div
                    style={
                      selectedKeys.findIndex((el) => el == item.id) != -1
                        ? { border: '1px solid #059aff', padding: '3px' }
                        : { border: '1px solid #d9d9d9', padding: '3px' }
                    }
                    onClick={(e) => {
                      onCheckRadio(e, item);
                    }}
                  >
                    <img src={`${item.id}${item.ext}`} alt="avatar" style={{ width: '100%' }} />
                    <Checkbox
                      checked={selectedKeys.findIndex((el) => el == item.id) != -1 ? true : false}
                    ></Checkbox>
                  </div>
                </Col>
              ))}
            </Row>
          )}
        </Spin>
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

export default connect(({ imgStore, loading }: ConnectState) => ({
  imgStoreStateProps: imgStore,
}))(ImgStore);
