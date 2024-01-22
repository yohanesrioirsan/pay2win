import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../../components/Layout/NavBar/NavBar";
import axios from "axios";
import "../../Styles/Payment.css";

function PaymentPage() {
  const { id, amount, category, name, priceName, priceValue } = useParams();
  const [userId, setUserId] = useState("");
  const [method, setMethod] = useState("ovo");
  const apiCat = category;
  const apiName = name;
  const apiOrders = priceName;
  const apiPayamount = priceValue;
  const apiUserId = userId;
  const apiMethod = method;
  const navigate = useNavigate();

  const handlePayment = async () => {
    const apiData = {
      name: apiName,
      category: apiCat,
      orders: apiOrders,
      pay_amount: apiPayamount,
      userId: apiUserId,
      payment_method: apiMethod,
    };

    try {
      const response = await axios.post(
        "https://pay2win-puce.vercel.app/payment",
        apiData
      );
      const orderIdFromResponse = response.data.order_id;
      console.log(orderIdFromResponse);
      navigate(`/receipt/${orderIdFromResponse}`);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {}, [id, amount, category, name, priceName, priceValue]);
  return (
    <>
      <NavBar />
      <main>
        <section className="payment-details">
          <div className="payment-container">
            <div className="payment-info">
              <h1 style={{ color: "white" }}>Order Details</h1>
              <div className="forms">
                <div className="payment-details-forms">
                  <label htmlFor="user-id">Masukkan ID Game</label>
                  <input
                    onChange={(event) => setUserId(event.target.value)}
                    type="text"
                    placeholder="Contoh: 7316xxx atau Username Game"
                  />
                  <label htmlFor="game-id">Nama Game</label>
                  <input type="text" value={name} name="game-id" disabled />
                  <label htmlFor="game-id">Kategori</label>
                  <input type="text" value={category} name="game-id" disabled />
                  <label htmlFor="game-id">Harga</label>
                  <input
                    type="text"
                    value={`Rp. ${priceValue}`}
                    name="game-id"
                    disabled
                  />
                </div>
                <div className="payment-details-forms">
                  <label htmlFor="game-id">Pesanan</label>
                  <input
                    type="text"
                    value={priceName}
                    name="game-id"
                    disabled
                  />
                  <label htmlFor="game-id">Jumlah Pembayaran</label>
                  <input
                    type="text"
                    value={`Rp. ${priceValue}`}
                    name="game-id"
                    disabled
                  />
                  <label htmlFor="payment-method">Pilih Pembayaran</label>
                  <select
                    id="payment-method"
                    onChange={(event) => setMethod(event.target.value)}
                  >
                    <option value="ovo">OVO</option>
                    <option value="bca">BCA</option>
                    <option value="gopay">GoPay</option>
                    <option value="qris">QRIS</option>
                  </select>
                  <div className="next-prev-btn">
                    <button className="btn-next" onClick={handlePayment}>
                      Proses Sekarang
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default PaymentPage;
