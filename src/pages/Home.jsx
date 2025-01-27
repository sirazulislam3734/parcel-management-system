import AppStatistics from "../components/AppStatistics";
import Banner from "../components/Banner";
import FeatureSection from "../components/FeatureSection";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import TopDeliveryMen from "../components/TopDeliveryMen";


const Home = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Banner></Banner>
            <FeatureSection></FeatureSection>
            <AppStatistics></AppStatistics>
            <TopDeliveryMen></TopDeliveryMen>
            <Footer></Footer>
        </div>
    );
};

export default Home;