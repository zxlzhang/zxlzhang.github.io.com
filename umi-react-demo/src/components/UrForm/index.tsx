import { PageContainer } from '@ant-design/pro-layout';
import React, { Component, Suspense } from 'react';
import { Card, Select, Form, Row, Col, Button, Typography, DatePicker, Space } from 'antd';
import { useIntl, FormattedMessage, connect, Dispatch, ConnectProps, history, Link } from 'umi';
import moment from 'moment';
// import styles from './Welcome.less';
import styles from './index.less';

interface UrFormProps {
  dashboardAndanalysis: any;
  dispatch: Dispatch<any>;
  loading: boolean;
  listForm: Array;
}

interface UrFormState {
  salesType: 'all' | 'online' | 'stores';
  currentTabKey: string;
  registerUser: number;
  accessUser: number;
  formItemLayout: object;
  tailLayout: object;
  listForm: Array;
  form: any;
}

class UrForm extends Component<UrFormProps, UrFormState> {
  state: UrFormState = {
    salesType: 'all',
    currentTabKey: '',
    registerUser: 0,
    accessUser: 0,
    formItemLayout: {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    },
    listForm: this.props.listForm,
    tailLayout: {
      wrapperCol: { offset: 8, span: 16 },
    },
    form: Form.useForm(),
  };

  reqRef: number = 0;

  timeoutId: number = 0;

  componentDidMount() {
    // const { dispatch } = this.props;
    // this.reqRef = requestAnimationFrame(() => {
    //   dispatch({
    //     type: 'dashboardAndanalysis/fetch',
    //   });
    // });
  }

  componentWillUnmount() {
    // const { dispatch } = this.props;
    // dispatch({
    //   type: 'dashboardAndanalysis/clear',
    // });
    // cancelAnimationFrame(this.reqRef);
    // clearTimeout(this.timeoutId);
  }

  // handleChangeSalesType = (e: RadioChangeEvent) => {
  //   this.setState({
  //     salesType: e.target.value,
  //   });
  // };

  // handleTabChange = (key: string) => {
  //   this.setState({
  //     currentTabKey: key,
  //   });
  // };

  // handleRangePickerChange = (rangePickerValue: RangePickerValue) => {
  //   const { dispatch } = this.props;
  //   this.setState({
  //     rangePickerValue,
  //   });

  //   dispatch({
  //     type: 'dashboardAndanalysis/fetchSalesData',
  //   });
  // };

  // selectDate = (type: 'today' | 'week' | 'month' | 'year') => {
  //   const { dispatch } = this.props;
  //   this.setState({
  //     rangePickerValue: getTimeDistance(type),
  //   });

  //   dispatch({
  //     type: 'dashboardAndanalysis/fetchSalesData',
  //   });
  // };

  // isActive = (type: 'today' | 'week' | 'month' | 'year') => {
  //   const { rangePickerValue } = this.state;
  //   if (!rangePickerValue) {
  //     return '';
  //   }
  //   const value = getTimeDistance(type);
  //   if (!value) {
  //     return '';
  //   }
  //   if (!rangePickerValue[0] || !rangePickerValue[1]) {
  //     return '';
  //   }
  //   if (
  //     rangePickerValue[0].isSame(value[0] as moment.Moment, 'day') &&
  //     rangePickerValue[1].isSame(value[1] as moment.Moment, 'day')
  //   ) {
  //     return styles.currentDate;
  //   }
  //   return '';
  // };

  onFinish = () => {
    console.log('点击提交按钮');
  };
  onReset = () => {
    console.log('点击了重置按钮');
  };

  render() {
    const { listForm, formItemLayout, tailLayout, form } = this.state;
    this.setState({
      listForm: [
        {
          label: 'xingming',
          type: 'input',
          fieldId: 'name',
          fieldValue: 'fieldValue',
          onChange: 'onChangeName',
          defaultValue: 'defaultValue',
          maxLength: 3,
        },
      ],
    });

    const { Paragraph } = Typography;
    const { RangePicker } = DatePicker;
    return (
      <PageContainer>
        <Form form={form} name="advanced_search" {...formItemLayout} onFinish={this.onFinish}>
          <Form.Item label="Plain Text">
            <span className="ant-form-text">China</span>
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button htmlType="button" onClick={this.onReset}>
              Reset
            </Button>
          </Form.Item>
        </Form>
      </PageContainer>
    );
  }
}

export default UrForm;
// export default connect(
//   ({
//     dashboardAndanalysis,
//     loading,
//   }: {
//     dashboardAndanalysis: any;
//     loading: {
//       effects: { [key: string]: boolean };
//     };
//   }) => ({
//     dashboardAndanalysis,
//     loading: loading.effects['dashboardAndanalysis/fetch'],
//   }),
// )(Analysis);

// export default (): React.ReactNode => {
//   const intl = useIntl();
//   return (
//     <PageContainer>
//       <Row gutter={{ md: 24 }}>
//         <Col span={6} className={styles.urContentStatistic}>
//           <Statistic value={112893} />
//           <p>今日新增注册用户</p>
//         </Col>
//         <Col span={6} className={styles.urContentStatistic}>
//           <Statistic value={112893} precision={2} />
//           <p>今日访问用户量</p>
//         </Col>
//       </Row>
//     </PageContainer>
//   );
// };
