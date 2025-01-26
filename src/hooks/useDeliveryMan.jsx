import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useDeliveryMan = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: isDeliveryMan } = useQuery({
    queryKey: [user?.email, "isDeliveryMan"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/deliveryMan/${user?.email}`);
      return res.data?.deliveryMan;
    },
  });
  return [isDeliveryMan];
};

export default useDeliveryMan;