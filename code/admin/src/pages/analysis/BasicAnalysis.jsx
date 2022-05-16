import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./basicAnalysis.scss";
import WidgetUser from "../../components/widget/WidgetUser";
import Featured from "../../components/featured/Featured";
import SellingProducts from "../../components/chart/SellingProducts";
import Table from "../../components/table/Table";
import WidgetTodayOrder from "../../components/widget/WidgetTodayOrder";
import WidgetTotalMoneyTodayOrder from "../../components/widget/WidgetTotalMoneyTodayOrder";
import WidgetYesterdayOrder from "../../components/widget/WidgetYesterdayOrder";
import WidgetTotalMoneyYesterdayOrder from "../../components/widget/WidgetTotalMoneyYesterdayOrder";


const BasicAnalysis = () => {
  document.body.style.backgroundImage = `none`;
  document.body.style.backgroundColor = "white";

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <WidgetUser />
          <WidgetTodayOrder />
          <WidgetYesterdayOrder />
          <WidgetTotalMoneyTodayOrder />
          <WidgetTotalMoneyYesterdayOrder />
        </div>
        <div className="charts">
          <SellingProducts title="Last 6 Months (Revenue)" aspect={3 / 1} />
        </div>
      </div>
    </div>
  );
};

export default BasicAnalysis;
