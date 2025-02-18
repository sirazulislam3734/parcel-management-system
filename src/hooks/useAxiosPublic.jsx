import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://parcel-management-system-server-tau.vercel.app'
})
const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;