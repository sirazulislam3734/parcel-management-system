import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const LineChart = () => {
  const [chartData, setChartData] = useState({ dates: [], booked: [], delivered: [] });
  const axiosSecure = useAxiosSecure()

  const { data: parcel } = useQuery({
    queryKey: ["parcel"],
    queryFn: async () => {
      const res = await axiosSecure.get("/booked-delivered");
      return res.data;
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
      const delivered = delivery?.map((item) => item.totalDeliver || 0);
      setChartData({ dates, booked, delivered });
    }
  }, [parcel,delivery]);
//   if (isLoading) return <p>Loading...</p>;
//   if (isError) return <p>Error loading chart data!</p>;

  const options = {
    chart: {
      type: "line",
      height: 350,
      background: "#F1F5F9", // Chart background color
    },
    xaxis: {
      categories: chartData.dates,
      title: {
        text: "Booking Dates",
        style: { fontSize: "14px", fontWeight: "bold", color: "#155DFC" },
      },
    },
    yaxis: {
      title: {
        text: "Number of Parcels",
        style: { fontSize: "8px", fontWeight: "bold", color: "#155DFC" },
      },
    },
    title: {
      text: "Comparison of Booked and Delivered Parcels",
      align: "center",
      style: { fontSize: "16px", fontWeight: "bold", color: "#155DFC" },
    },
    colors: ["#155DFC", "#2ECC71"],
  };

  const series = [
    { name: "Booked Parcels", data: chartData?.booked },
    { name: "Delivered Parcels", data: chartData?.delivered },
  ];

  return (
    <div className="border p-4 rounded-lg">
      <Chart options={options} series={series} type="line" height={350} />
    </div>
  );
};

export default LineChart;