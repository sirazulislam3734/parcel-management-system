import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: payments = [] } = useQuery({
    queryKey: ["payments", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${user.email}`);
      return res.data;
    },
  });

  return (
    <div className="p-4 lg:p-8">
      <h2 className="text-2xl md:text-3xl lg:text-4xl text-center font-bold mb-4">Payment History</h2>
      <div className="bg-white p-4 lg:p-8 rounded-xl shadow-md">
        <div className="flex flex-col lg:flex-row lg:justify-between items-start lg:items-center mb-4">
          <h2 className="text-lg lg:text-2xl font-semibold">
            Total Payments: {payments.length}
          </h2>
        </div>
        <div className="mt-6">
          <div className="overflow-x-auto">
            <table className="table-auto w-full text-left border-collapse">
              {/* Table Header */}
              <thead>
                <tr className="bg-gray-100 text-gray-700 uppercase text-xs lg:text-sm">
                  <th className="p-2 lg:p-4 border">#</th>
                  <th className="p-2 lg:p-4 border">EMAIL</th>
                  <th className="p-2 lg:p-4 border">TRANSACTION ID</th>
                  <th className="p-2 lg:p-4 border">PRICE</th>
                  <th className="p-2 lg:p-4 border">STATUS</th>
                  <th className="p-2 lg:p-4 border">DATE</th>
                </tr>
              </thead>
              {/* Table Body */}
              <tbody>
                {payments.map((payment, idx) => (
                  <tr
                    key={payment._id}
                    className="text-sm lg:text-base border-b hover:bg-gray-50"
                  >
                    <td className="p-2 lg:p-4 border">{idx + 1}</td>
                    <td className="p-2 lg:p-4 border font-medium">
                      {payment.email}
                    </td>
                    <td className="p-2 lg:p-4 border">{payment.transactionId}</td>
                    <td className="p-2 lg:p-4 border">${payment.price}</td>
                    <td className="p-2 lg:p-4 border">{payment.status}</td>
                    <td className="p-2 lg:p-4 border">{payment.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Show message if no payments are found */}
          {payments.length === 0 && (
            <p className="text-center text-gray-500 mt-6">
              No payment records found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;
