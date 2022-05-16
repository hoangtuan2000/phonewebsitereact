import "./chart.scss";
import { useState, useEffect } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';
import Axios from "axios";
import { URL } from "../../config/config";

const SellingProducts = ({ aspect }) => {

  const [sellingProducts, setSellingProducts] = useState([])

  useEffect(() => {
    Axios.get(URL + '/analysisRouterAdmin/sellingProducts')
      .then((res) => {
        if (res.data.sellingProductsStatus) {
          setSellingProducts(res.data.sellingProductsData)
        }
      })
      .catch((err) => {
        console.log('WidgetUser', err);
      })
  }, [])
  console.log(sellingProducts);

  return (
    <div className="chart">
      <div className="title">Top 5 Sản Phẩm Bán Chạy</div>

      <ResponsiveContainer width="100%" height="100%" aspect={aspect}>
        <BarChart
          width={500}
          height={300}
          data={sellingProducts}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="ten_sp" />
          <YAxis  label={{ value: 'Tổng Số Sản Phẩm', angle: -90, position: 'insideLeft' }}/>
          <Tooltip />
          <Legend />
          <Bar name="Tổng Số Sản Phẩm Đã Bán" dataKey="tong_sp" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SellingProducts;
