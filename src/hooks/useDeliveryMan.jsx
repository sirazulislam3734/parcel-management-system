import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useDeliveryMan = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: isDeliveryMan, isPending: isDeliveryManLoading } = useQuery({
    queryKey: [user?.email, "isDeliveryMan"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/delivery/${user?.email}`);
      return res.data?.deliveryMan;
    },
  });
  return [isDeliveryMan, isDeliveryManLoading];
};

export default useDeliveryMan;