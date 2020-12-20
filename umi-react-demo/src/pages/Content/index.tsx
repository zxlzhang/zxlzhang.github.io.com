import { PageContainer } from '@ant-design/pro-layout';
import React, { Component, Suspense } from 'react';
import { Card, Dropdown, Menu, Row, Col, Statistic, Button, Typography } from 'antd';
import { useIntl, FormattedMessage, connect, Dispatch, ConnectProps, history, Link } from 'umi';
import { RadioChangeEvent } from 'antd/es/radio';
import { RangePickerProps } from 'antd/es/date-picker/generatePicker';
import { getTimeDistance } from '../utils/utils';
import { GridContent } from '@ant-design/pro-layout';
import moment from 'moment';
// import styles from './Welcome.less';
import styles from './index.less';

type RangePickerValue = RangePickerProps<moment.Moment>['value'];

interface AnalysisProps {
  dashboardAndanalysis: any;
  dispatch: Dispatch<any>;
  loading: boolean;
}

interface AnalysisState {
  salesType: 'all' | 'online' | 'stores';
  currentTabKey: string;
  rangePickerValue: RangePickerValue;
  registerUser: number;
  accessUser: number;
}

class Analysis extends Component<AnalysisProps, AnalysisState> {
  state: AnalysisState = {
    salesType: 'all',
    currentTabKey: '',
    rangePickerValue: getTimeDistance('year'),
    registerUser: 0,
    accessUser: 0,
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

  render() {
    const { registerUser, accessUser } = this.state;
    // const { dashboardAndanalysis, loading } = this.props;

    // const {
    //   // visitData,
    //   visitData2,
    //   salesData,
    //   searchData,
    //   offlineData,
    //   offlineChartData,
    //   salesTypeData,
    //   salesTypeDataOnline,
    //   salesTypeDataOffline,
    // } = dashboardAndanalysis;
    // let salesPieData;
    // if (salesType === 'all') {
    //   salesPieData = salesTypeData;
    // } else {
    //   salesPieData = salesType === 'online' ? salesTypeDataOnline : salesTypeDataOffline;
    // }
    // const menu = (
    //   <Menu>
    //     <Menu.Item>操作一</Menu.Item>
    //     <Menu.Item>操作二</Menu.Item>
    //   </Menu>
    // );

    // const dropdownGroup = (
    //   <span className={styles.iconGroup}>
    //     <Dropdown overlay={menu} placement="bottomRight">
    //       {/* <EllipsisOutlined /> */}
    //     </Dropdown>
    //   </span>
    // );

    // const activeKey = currentTabKey || (offlineData[0] && offlineData[0].name);
    const { Paragraph } = Typography;
    return (
      <PageContainer>
        <Paragraph>
          <Row gutter={{ md: 24 }}>
            <Col span={6}>
              <div className={styles.urContentStatistic}>
                <Statistic value={registerUser} />
                <p>今日新增注册用户</p>
              </div>
            </Col>
            <Col span={6}>
              <div className={styles.urContentStatistic}>
                <Statistic value={accessUser} />
                <p>今日访问用户量</p>
              </div>
            </Col>
          </Row>
        </Paragraph>
        <Paragraph className={styles.urContentCategory}>
          <h3>常用功能</h3>
          <Button type="primary">
            <Link to="/content/university">院校</Link>
          </Button>
          <Button type="primary">
            <Link to="/content/service">服务</Link>
          </Button>
          <Button type="primary">
            <Link to="/content/news">新闻</Link>
          </Button>
        </Paragraph>
      </PageContainer>
      // <GridContent>
      //   <React.Fragment>
      //     <Suspense fallback={<PageLoading />}>
      //       <IntroduceRow loading={loading} visitData={visitData} />
      //     </Suspense>
      //     <Suspense fallback={null}>
      //       <SalesCard
      //         rangePickerValue={rangePickerValue}
      //         salesData={salesData}
      //         isActive={this.isActive}
      //         handleRangePickerChange={this.handleRangePickerChange}
      //         loading={loading}
      //         selectDate={this.selectDate}
      //       />
      //     </Suspense>
      //     <Row
      //       gutter={24}
      //       style={{
      //         marginTop: 24,
      //       }}
      //     >
      //       <Col xl={12} lg={24} md={24} sm={24} xs={24}>
      //         <Suspense fallback={null}>
      //           <TopSearch
      //             loading={loading}
      //             visitData2={visitData2}
      //             searchData={searchData}
      //             dropdownGroup={dropdownGroup}
      //           />
      //         </Suspense>
      //       </Col>
      //       <Col xl={12} lg={24} md={24} sm={24} xs={24}>
      //         <Suspense fallback={null}>
      //           <ProportionSales
      //             dropdownGroup={dropdownGroup}
      //             salesType={salesType}
      //             loading={loading}
      //             salesPieData={salesPieData}
      //             handleChangeSalesType={this.handleChangeSalesType}
      //           />
      //         </Suspense>
      //       </Col>
      //     </Row>
      //     <Suspense fallback={null}>
      //       <OfflineData
      //         activeKey={activeKey}
      //         loading={loading}
      //         offlineData={offlineData}
      //         offlineChartData={offlineChartData}
      //         handleTabChange={this.handleTabChange}
      //       />
      //     </Suspense>
      //   </React.Fragment>
      // </GridContent>
    );
  }
}

export default Analysis;
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
