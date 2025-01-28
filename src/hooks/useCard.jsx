import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";



const useCard = () => {

    const axiosSecure = useAxiosSecure()
    const {user} = useAuth();
    const { refetch ,data: card = []} = useQuery({
        queryKey: ['card', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/bookAParcel/${user.email}`)
            return res.data
        }
    })
    return [card, refetch]
};

export default useCard;