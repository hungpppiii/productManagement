import "./statistical.css";
import Sidebar from "../sidebar/sidebar";
import Navbar from "../../../../components/navbar/navbar";
import BarChart from "../../../../components/charts/barChart/barChart";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Statistical() {
  const ManufactureFactory = "Cơ sở sản xuất";
  const ServiceCenter = "Trung tâm bảo hành";
  const Distributor = "Đại lý";
  const productStatis = "Thống kê theo trạng thái của tất cả sản phẩm";

  const dataKeyProduct = "grossProduct";
  const dataKeyProductLine = "grossProductLine";

  const [dataProduct, setDataProduct] = useState([]);
  const [dataManufacture, setDataManufacture] = useState([]);

  useEffect(() => {
    const getStatus = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/toyProduct/getStatus"
        );
        setDataProduct(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getStatus();
  }, []);

  useEffect(() => {
    const getStatus = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/toyProduct/countQuantification/",
          { _id: "63ac4caf27620028d068306b" }
        );
        setDataManufacture(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getStatus();
  }, []);

  const dataStatisManufacture = [
    { name: "Vios", grossProductLine: 20 },
    { name: "Fortuner", grossProductLine: 10 },
    { name: "Raize", grossProductLine: 5 },
    { name: "Altis", grossProductLine: 10 },
    { name: "Camry", grossProductLine: 13 },
    { name: "Yaris", grossProductLine: 22 },
  ];
  const dataDistributor = [
    { name: "Vios", grossProductLine: 30 },
    { name: "Fortuner", grossProductLine: 20 },
    { name: "Raize", grossProductLine: 15 },
    { name: "Altis", grossProductLine: 10 },
    { name: "Camry", grossProductLine: 19 },
    { name: "Yaris", grossProductLine: 10 },
  ];
  const dataServiceCenter = [
    { name: "Vios", grossProductLine: 2 },
    { name: "Fortuner", grossProductLine: 5 },
    { name: "Raize", grossProductLine: 5 },
    { name: "Altis", grossProductLine: 7 },
    { name: "Camry", grossProductLine: 9 },
    { name: "Yaris", grossProductLine: 2 },
  ];

  return (
    <div className="statistical">
      <Sidebar />
      <div className="wrapper">
        <Navbar />
        <div className="mainStatistical">
          <BarChart
            {...{
              title: productStatis,
              data: dataProduct,
              dataKey: dataKeyProduct,
            }}
          />
          <BarChart
            {...{
              title: Distributor,
              data: dataDistributor,
              dataKey: dataKeyProductLine,
            }}
          />
          <BarChart
            {...{
              title: ManufactureFactory,
              data: dataStatisManufacture,
              dataKey: dataKeyProductLine,
            }}
          />
          <BarChart
            {...{
              title: ServiceCenter,
              data: dataServiceCenter,
              dataKey: dataKeyProductLine,
            }}
          />
        </div>
      </div>
    </div>
  );
}
