import { Helmet } from "react-helmet-async";
import BarChart from "./BarChart";
import LineChart from "./LineChart";


const StatisticsPage = () => {
    return (
        <div className="min-h-screen">
            <Helmet>
                <title>Statistics</title>
            </Helmet>
            <BarChart></BarChart>
            <LineChart></LineChart>
        </div>
    );
};

export default StatisticsPage;