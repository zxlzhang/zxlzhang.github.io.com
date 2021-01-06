import { PageContainer } from '@ant-design/pro-layout';
import React, {
  Component,
  Suspense,
  useRef,
  useCallback,
  useState,
  useEffect,
  useMemo,
} from 'react';
import { Button, Space, Table, Row, Col, Select, Checkbox, Modal } from 'antd';
import { useIntl, FormattedMessage, connect, Dispatch, ConnectProps, history, Link } from 'umi';
import ProTable, { ProColumns, TableDropdown, ActionType } from '@ant-design/pro-table';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import debounce from 'lodash.debounce';
import { StateType } from '@/models/news';
import { ConnectState } from '@/models/connect';
import { Public, Admin } from '@/services';

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
  name: string;
  summary: string;
  brochure: string;
  badge: string;
  avatar: string;
  banner: string;
  hero: string;
  tags: string;
  eduRanges: string;
  professions: string;
  // hotNews: null;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
  dataSource: Array<[]>;
}

interface NewsModelProps {
  dispatch: Dispatch;
  newsProps: StateType;
  // submitting?: boolean;
}

const News: React.FC<NewsModelProps> = (props) => {
  // const [universityList, setUniversity] = useState([]);
  const { newsProps = {} } = props;
  const { params } = newsProps;

  const [limit, setPagesize] = useState(10);
  const [total, setTotal] = useState(0);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState<Array<{}>>([]);
  const [selectedKeys, setRowKeys] = useState([]);

  const { confirm } = Modal;

  const columns: ProColumns<GithubIssueItem>[] = [
    {
      dataIndex: 'title',
      // // valueType: 'select',
      //   hideInTable: true,,
      initialValue: (params && params.title) || undefined,
      title: '新闻资讯',
      // valueEnum: {},
      renderFormItem: (item, { defaultRender }) => {
        return (
          <Select
            showSearch
            placeholder={'请输入新闻资讯'}
            // style={this.props.style}
            defaultActiveFirstOption={false}
            showArrow={false}
            filterOption={false}
            onSearch={handleChangeTitle}
            // onChange={handleChangeTitle}
            notFoundContent={null}
          >
            {/* {item} */}
          </Select>
        );
      },
    },
    {
      dataIndex: 'publishman',
      valueType: 'select',
      initialValue: (params && params.publishman) || undefined,
      title: '发布者',
    },
    {
      dataIndex: 'date',
      title: '日期',
      initialValue: (params && params.date) || undefined,
      valueType: 'date',
      render: (_, record) => (
        <Space>{moment(record.createdAt).format('YYYY-MM-DD HH:mm:ss')}</Space>
      ),
    },
    {
      dataIndex: 'status',
      valueType: 'select',
      title: '发布状态',
      initialValue: (params && params.status) || undefined,
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
          <Checkbox onChange={(e) => onChangePublish(record, e)} checked={record.isPublished}>
            已上线
          </Checkbox>
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
    Admin.queryArticles(obj)
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

  //单个上下线
  const onChangePublish = (item: any, e: any) => {
    confirm({
      title: `确定${e.target.checked ? '发布' : '取消发布'}该新闻资讯吗？`,
      icon: <ExclamationCircleOutlined />,
      onOk() {
        console.log('OK');
        isPublishAticle(e.target.checked, [item.id]);
      },
      onCancel() {},
    });
  };

  const isPublishAticle = (isPublished: boolean, ids: Array<''>) => {
    Admin.publishAticle({ isPublished: !isPublished ? '0' : '1', ids: ids.join(',') }).then(
      (res) => {
        if (!res.error) {
          setRowKeys([]);
          find();
        }
      },
    );
  };

  const handleChangeTitle = useCallback(
    debounce((e: any) => {
      console.log(e, 'e====变化院校==');
    }, 800),
    [],
  );
  const onEditor = (record: any) => {
    const { dispatch } = props;
    dispatch({
      type: 'news/setCurrentItem',
      payload: { currentItem: { ...record } },
    });
    history.push('/content/news/publish');
    console.log('编辑', record);
  };
  //批量上线
  const goOnLine = () => {
    confirm({
      title: `确定发布该新闻资讯吗？`,
      icon: <ExclamationCircleOutlined />,
      onOk() {
        console.log('OK');
        isPublishAticle(true, selectedKeys);
      },
      onCancel() {},
    });
  };
  //批量下线
  const goOutLine = () => {
    confirm({
      title: `确定取消发布该新闻资讯吗？`,
      icon: <ExclamationCircleOutlined />,
      onOk() {
        console.log('OK');
        isPublishAticle(false, selectedKeys);
      },
      onCancel() {},
    });
  };
  //批量删除
  const onMutipleDel = () => {
    confirm({
      title: `确定删除该新闻资讯吗？`,
      icon: <ExclamationCircleOutlined />,
      onOk() {
        Admin.removeArticles({ ids: selectedKeys.join(',') }).then((res) => {
          if (!res.error) {
            setRowKeys([]);
            find();
          }
        });
      },
      onCancel() {},
    });
  };
  //提交搜索
  const onSubmit = (e: any) => {
    console.log(e, '提交表单');
    const { dispatch } = props;
    dispatch({
      type: 'news/setParams',
      payload: { params: { ...e } },
    });
  };
  //多选
  const onSelectedRowKeys = (rowKeys: any, rows: any) => {
    setRowKeys(rowKeys);
  };
  //变化页面
  const onChangePage = (current: any, pageSize: any) => {
    console.log(current, '变化页面', pageSize);
  };
  //变化条数
  const onShowSizeChange = (current: any, pageSize: any) => {
    setPagesize(pageSize);
    setOffset((current - 1) * 0);
  };

  const onCreate = () => {
    const { dispatch } = props;
    dispatch({
      type: 'news/setCurrentItem',
      payload: { currentItem: undefined },
    });
  };

  const actionRef = useRef<ActionType>();

  return (
    <PageContainer>
      <Row>
        <Col className={styles.urNews}>
          <Button type="primary" onClick={goOnLine} disabled={selectedKeys.length == 0}>
            批量上线
          </Button>
          <Button type="primary" onClick={goOutLine} disabled={selectedKeys.length == 0}>
            批量下线
          </Button>
          <Button type="primary" onClick={onMutipleDel} disabled={selectedKeys.length == 0}>
            批量删除
          </Button>
          <Button type="primary" onClick={onCreate}>
            <Link to="/content/news/publish"> 发布文章</Link>
          </Button>
        </Col>
      </Row>
      <ProTable<GithubIssueItem>
        className={styles.urProTable}
        columns={columns}
        loading={loading}
        rowSelection={{
          // 自定义选择项参考: https://ant.design/components/table-cn/#components-table-demo-row-selection-custom
          // 注释该行则默认不显示下拉选项
          selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
          selectedRowKeys: selectedKeys,
          onChange: (selectedRowKeys, selectedRows) => {
            onSelectedRowKeys(selectedRowKeys, selectedRows);
          },
        }}
        actionRef={actionRef}
        onSubmit={onSubmit}
        dataSource={dataSource}
        // request={
        //   dataSource:dataSource,
        //   total:total
        //   // async (params = {}) =>
        //   // request<{
        //   //   data: GithubIssueItem[];
        //   // }>('https://proapi.azurewebsites.net/github/issues', {
        //   //   params,
        //   // })
        // }
        editable={{
          type: 'multiple',
        }}
        rowKey="id"
        search={{
          labelWidth: 'auto',
          defaultCollapsed: false,
        }}
        pagination={{
          pageSize: limit,
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

export default connect(({ news, loading }: ConnectState) => ({
  newsProps: news,
}))(News);
