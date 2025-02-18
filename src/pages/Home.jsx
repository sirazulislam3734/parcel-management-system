import { Helmet } from "react-helmet-async";
import AppStatistics from "../components/AppStatistics";
import Banner from "../components/Banner";
import FeatureSection from "../components/FeatureSection";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import TopDeliveryMen from "../components/TopDeliveryMen";
import AboutSection from "./AboutSection";
import ServiceSection from "./ServiceSection";
import ContactSection from "./ContactSection";


const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Home || Parcel Management</title>
            </Helmet>
            <Navbar></Navbar>
            <Banner></Banner>
            <FeatureSection></FeatureSection>
            <AboutSection></AboutSection>
            <ServiceSection></ServiceSection>
            <AppStatistics></AppStatistics>
            <TopDeliveryMen></TopDeliveryMen>
            <ContactSection></ContactSection>
            <Footer></Footer>
        </div>
    );
};

export default Home;