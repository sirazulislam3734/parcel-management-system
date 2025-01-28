import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useCard from "../../hooks/useCard";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";


const CheckOutForm = () => {
  const [clientSecrets, setClientSecret] = useState("");
  const [translation, setTranslation] = useState("");
  const navigate = useNavigate();
  const stripe = useStripe();
  const params = useParams()
  const { user } = useAuth();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const [card, refetch] = useCard();
  const {data} = useQuery({
    queryKey: ["parcels", params.id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookAParcelGet/${params.id}`);
      return res.data;
    },
  });
  useEffect(() => {
    if (data?.price > 0) {
      axiosSecure.post(`/create-payment-intent`, { price: data?.price })
        .then((res) => {
          console.log("responsive Data", res.data);
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [axiosSecure, data?.price]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const cart = elements.getElement(CardElement);
    if (!cart) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      console.log(error.message);
    } else {
      console.log(" payment method created", paymentMethod);
    }
    // Confirm the payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecrets, {
        payment_method: {
          card: cart,
          billing_details: {
            name: user?.displayName || "Unknown",
            email: user?.email || "Unknown",
          },
        },
      });
    if (confirmError) {
      console.log("Confirm error", confirmError);
    } else {
      console.log("Payment confirmed", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        setTranslation(paymentIntent.id);
        const payment = {
          email: user?.email,
          price: data?.price,
          date: new Date(),
          transactionId: translation,
        };

        const res = await axiosSecure.post("/payments", payment);
        console.log(res.data);
        refetch();
        if (res.data.paymentResult?.insertedId) {
          Swal.fire({
            title: "Success!",
            text: "Payment is Successful!",
            icon: "success",
          });
          navigate("/dashboard/paymentHistory");
        }
      }
    }
  };
//   console.log('stripe', stripe, translation);
//   console.log('clientSecrets', clientSecrets);
  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        className="border py-4 px-10 rounded-xl "
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7b7",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      ></CardElement>
      <button
        className="mx-auto flex justify-center font-bold text-white rounded-lg my-5 px-10 py-3 bg-yellow-600"
        type="submit"
        disabled={!stripe || !clientSecrets}
      >
        PAY
      </button>
    </form>
  );
};

export default CheckOutForm;
