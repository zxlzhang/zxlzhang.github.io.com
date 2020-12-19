import { PageContainer } from '@ant-design/pro-layout';
import React, { Component, Suspense } from 'react';
import { Typography } from 'antd';
import { useIntl, FormattedMessage, connect, Dispatch, ConnectProps, history, Link } from 'umi';

import moment from 'moment';
// import styles from './Welcome.less';
// import styles from './Content.less';

interface AnalysisProps {
  dashboardAndanalysis: any;
  dispatch: Dispatch<any>;
  loading: boolean;
}

interface AnalysisState {
  salesType: 'all' | 'online' | 'stores';
  currentTabKey: string;
  //   rangePickerValue: RangePickerValue;
  registerUser: number;
  accessUser: number;
}

class Analysis extends Component<AnalysisProps, AnalysisState> {
  state: AnalysisState = {
    salesType: 'all',
    currentTabKey: '',
    // rangePickerValue: getTimeDistance('year'),
    registerUser: 0,
    accessUser: 0,
  };

  reqRef: number = 0;

  timeoutId: number = 0;

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    const { registerUser, accessUser } = this.state;

    console.log(this.state, ' this.state======', this.props, 'this.props=====s');
    const { Paragraph } = Typography;
    return (
      <PageContainer>
        <Paragraph>发布</Paragraph>
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
