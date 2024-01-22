import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../../components/Layout/NavBar/NavBar";
import "../../Styles/ProductDetail.css";

interface PriceType {
  id: string;
  name: string;
  value: number;
}

interface GameDetailType {
  id: number;
  image: string;
  name: string;
  category: string;
  price: PriceType[];
}

function ProductDetail() {
  const [gameDetail, setGameDetail] = useState<GameDetailType | null>(null);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<PriceType | null>(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGameDetail = async () => {
      try {
        const response = await axios.get(
          `https://pay2win-puce.vercel.app/allproducts/${id}`
        );
        setGameDetail(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchGameDetail();
  }, [id]);

  const handleBuyClick = (price: PriceType) => {
    setSelectedAmount(price.value);
    setSelectedPrice(price);
  };

  const handleBuyNowClick = () => {
    if (selectedAmount !== null && gameDetail !== null) {
      if (
        selectedAmount !== null &&
        selectedPrice !== null &&
        gameDetail !== null
      ) {
        const encodedCategory = encodeURIComponent(gameDetail.category);
        const encodedName = encodeURIComponent(gameDetail.name);
        const encodedPriceName = encodeURIComponent(selectedPrice.name);

        navigate(
          `/payment/${gameDetail.id}/${selectedAmount}/${encodedCategory}/${encodedName}/${encodedPriceName}/${selectedPrice.value}`
        );
      } else {
        alert("Harga tidak ditemukan");
      }
    } else {
      alert("Silakan pilih jumlah dan game terlebih dahulu");
    }
  };

  if (!gameDetail) {
    return <div>loading...</div>;
  }

  return (
    <>
      <NavBar />
      <main>
        <section className="product-detail-container">
          <div className="left-section">
            <div className="product-image">
              <img src={gameDetail.image} alt="" />
            </div>
            <div className="product-info">
              <h1>{gameDetail.name}</h1>
              <p>
                Beli {gameDetail.category} dengan cepat dan aman di Pay2Win.
              </p>
              <p style={{ marginTop: "1rem" }}>
                Beli {gameDetail.category} hanya dalam hitungan detik! <br />
                Pilih Jumlah {gameDetail.category} yang kamu inginkan, <br />
                selesaikan pembelian dan {gameDetail.category} kamu akan <br />
                langsung masuk kedalam akun {gameDetail.name} kamu.
              </p>
            </div>
          </div>
          <div className="right-section">
            <div className="product-price">
              {gameDetail.price.map((price) => (
                <button
                  className="btn-price"
                  key={price.id}
                  onClick={() => handleBuyClick(price)}
                >
                  {price.name}
                </button>
              ))}
            </div>
            {selectedAmount !== null && (
              <div className="buy">
                <button className="btn-buy" onClick={handleBuyNowClick}>
                  Beli Sekarang hanya Rp. {selectedAmount}
                </button>
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}

export default ProductDetail;
