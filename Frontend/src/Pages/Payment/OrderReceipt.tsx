import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../../Styles/UserInfo.css";
import { useEffect, useState } from "react";

interface OrderData {
  order_id: number;
  userId: string;
  pay_amount: number;
  payment_method: string;
  name: string;
  orders: string;
}

function OrderReceipt() {
  const { order_id } = useParams();
  const navigate = useNavigate();

  const [orderData, setOrderData] = useState<OrderData | undefined>(undefined);

  useEffect(() => {
    const fetchOrderId = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/payment/${order_id}`
        );
        setOrderData(response.data as OrderData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrderId();
  }, [order_id]);

  if (!orderData) {
    return <div>Loading...</div>;
  }
  return (
    <main>
      <section className="order-receipt">
        <div className="receipt-container">
          <h1>Order Placed!</h1>
          <hr style={{ marginTop: "1rem" }} />

          <div className="order-details">
            <div>
              <h3>ID : {order_id}</h3>
              <h3>USERID : {orderData.userId}</h3>
              <h3>
                ORDER : {orderData.name} - {orderData.orders}
              </h3>
            </div>
            <div>
              <h3>HARGA : Rp. {orderData.pay_amount}</h3>
              <h3>PEMBAYARAN : {orderData.payment_method}</h3>
              <h3>STATUS : PROSESS</h3>
            </div>
          </div>
          <button className="btn-back" onClick={() => navigate("/dashboard")}>
            BACK TO HOME
          </button>
        </div>
      </section>
    </main>
  );
}

export default OrderReceipt;
