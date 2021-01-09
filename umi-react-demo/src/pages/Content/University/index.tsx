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
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import debounce from 'lodash.debounce';
import { StateType } from '@/models/university';
import { ConnectState } from '@/models/connect';
import { Admin } from '@/services';

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
    span: number;
  }[];
  span: number;
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
}

interface universityProps {
  dispatch: Dispatch;
  universityProps: StateType;
  // submitting?: boolean;
}

const University: React.FC<universityProps> = (props) => {
  // const [universityList, setUniversity] = useState([]);
  const { universityProps = {} } = props;
  const { params, currentItem } = universityProps;
  const [limit, setPagesize] = useState(10);
  const [total, setTotal] = useState(0);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState<Array<{}>>([]);
  const [selectedKeys, setRowKeys] = useState([]);
  // const [columns, setColumns] = useState<Array<GithubIssueItem>>([]);

  const { confirm } = Modal;
  useEffect(() => {
    find();
    // setColumns([])
    console.log(params, 'params===useEffect');
  }, [limit, offset, params]);
  console.log(params, 'params====columns');
  const columns: ProColumns<GithubIssueItem>[] = [
    {
      dataIndex: 'name',
      // initialValue: (params && params.name) || undefined,
      title: '院校名称',
    },
    {
      dataIndex: 'publishman',
      valueType: 'select',
      // initialValue: (params && params.publishman) || undefined,
      title: '发布者',
    },
    {
      dataIndex: 'date',
      title: '日期',
      // initialValue: (params && params.date) || undefined,
      valueType: 'date',
      render: (_, record) => (
        <Space>{moment(record.createdAt).format('YYYY-MM-DD HH:mm:ss')}</Space>
      ),
    },
    {
      dataIndex: 'status',
      valueType: 'select',
      title: '发布状态',
      // initialValue: (params && params.status) || undefined,
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

  //获取列表
  const find = () => {
    const obj = {
      limit,
      offset,
      name: (params && params.name) || undefined,
      status: (params && params.status) || undefined,
      date: (params && params.date) || undefined,
      publishman: (params && params.publishman) || undefined,
    };
    setLoading(true);
    Admin.querySchools(obj)
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
      title: `确定${e.target.checked ? '发布' : '取消发布'}该院校吗？`,
      icon: <ExclamationCircleOutlined />,
      onOk() {
        console.log('OK');
        isPublishSchool(e.target.checked, [item.id]);
      },
      onCancel() {},
    });
  };

  const isPublishSchool = (isPublished: boolean, ids: Array<''>) => {
    Admin.publishSchool({ isPublished: !isPublished ? '0' : '1', ids: ids.join(',') }).then(
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
    // const { dispatch } = props;
    // dispatch({
    //   type: 'university/setCurrentItem',
    //   payload: { currentItem: { ...record } },
    // });
    history.push('/content/university/publish');
    window.sessionStorage.setItem('universityCurrentItem', JSON.stringify(record));
    console.log('编辑', record);
  };
  //批量上线
  const goOnLine = () => {
    confirm({
      title: `确定发布该院校吗？`,
      icon: <ExclamationCircleOutlined />,
      onOk() {
        console.log('OK');
        isPublishSchool(true, selectedKeys);
      },
      onCancel() {},
    });
  };
  //批量下线
  const goOutLine = () => {
    confirm({
      title: `确定取消发布该院校吗？`,
      icon: <ExclamationCircleOutlined />,
      onOk() {
        console.log('OK');
        isPublishSchool(false, selectedKeys);
      },
      onCancel() {},
    });
  };
  //批量删除
  const onMutipleDel = () => {
    confirm({
      title: `确定删除该院校吗？`,
      icon: <ExclamationCircleOutlined />,
      onOk() {
        Admin.removeSchool({ ids: selectedKeys.join(',') }).then((res) => {
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
      type: 'university/setParams',
      payload: { params: { ...e } },
    });
  };
  // //重置表单
  // const onReset = () => {
  //   const { dispatch } = props;
  //   dispatch({
  //     type: 'university/setParams',
  //     payload: { params: undefined },
  //   });
  // };
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
      type: 'university/setCurrentItem',
      payload: { currentItem: undefined },
    });
    window.sessionStorage.setItem('universityCurrentItem', 'undefined');
  };

  const actionRef = useRef<ActionType>();
  return (
    <PageContainer>
      <Row>
        <Col className={styles.urUniversity}>
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
            <Link to="/content/university/publish"> 发布院校</Link>
          </Button>
        </Col>
      </Row>
      <ProTable<GithubIssueItem>
        className={styles.urProTable}
        // labelAlign="left"
        // labelCol={{ span: 4 }}
        // wrapperCol={{ span: 14 }}
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
        // onReset={onReset}
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

export default connect(({ university, loading }: ConnectState) => ({
  universityProps: university,
}))(University);
