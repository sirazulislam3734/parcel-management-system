import { useQuery } from "@tanstack/react-query";
import Chart from "react-apexcharts";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useEffect, useState } from "react";

const BarChart = () => {
    const axiosSecure = useAxiosSecure()
const [chartData, setChartData] = useState({ dates: [], booked: []});
    const { data: parcel } = useQuery({
      queryKey: ["parcel"],
      queryFn: async () => {
        const res = await axiosSecure.get("/booked-delivered");
        return res.data?.result;
      },
    });
  
    const { data: delivery } = useQuery({
      queryKey: ["delivery"],
      queryFn: async () => {
        const res = await axiosSecure.get("/users");
        return res.data;
      },
    });

    useEffect(() => {
        if (parcel && Array.isArray(parcel)) {
          const dates = parcel?.map((item) => item.bookingDate);
          const booked = delivery?.map((item) => item.totalBooking || 0);
          setChartData({ dates, booked });
        }
      }, [parcel,delivery]);

      console.log(parcel, delivery);
  const options = {
    chart: {
      type: "bar",
      height: 350,
    },
    xaxis: {
      categories: chartData.dates,
      title: {
        text: "Dates",
        style: {
          color: "#282828",
          fontSize: "14px",
          fontWeight: "bold",
        },
      },
      labels: {
        style: {
          colors: "#155DFC",
          fontSize: "12px",
        },
      },

    },
    yaxis: {
      title: {
        text: "Total Bookings",
        style: {
          color: "#282828",
          fontSize: "14px",
          fontWeight: "bold",
        },
      },
      labels: {
        style: {
          colors: "#155DFC", 
          fontSize: "12px",
        },
      },
    },
    title: {
      text: "Bookings by Date",
      align: "center",
      style: {
        color: "#282828",
        fontSize: "14px",
        fontWeight: "bold",
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
      },
    },
    colors: ["#02E396"],
  };

  return (
    <div className="z-10" >
      <Chart
        className=""
        options={options}
        series={[{ name: "Bookings", data: chartData?.booked }]}
        type="bar"
        height={350}
      />
    </div>
  );
};

export default BarChart;