import "../../../Styles/Services.css";
import walletIcon from "../../../assets/icon/wallet.png";
import customerReady from "../../../assets/icon/247.png";
import invoiceIcon from "../../../assets/icon/invoice.png";

function Services() {
  return (
    <section className="services-container">
      <div className="service-wrapper">
        <div className="services-box">
          <div className="box">
            <div className="icon-img">
              <img src={walletIcon} alt="wallet-icon" />
            </div>
            <h2>Harga Bersaing</h2>
            <p>
              Kami menawarkan harga yang kompetitif, memastikan anda mendapatkan
              nilai maksimal dari setiap pembelian.
            </p>
          </div>
          <div className="box">
            <div className="icon-img">
              <img src={customerReady} alt="wallet-icon" />
            </div>
            <h2>Layanan 24/7</h2>
            <p>
              Tim pelayanan pelanggan kami siap membantu Anda 24 jam sehari, 7
              hari seminggu.
            </p>
          </div>
          <div className="box">
            <div className="icon-img">
              <img src={invoiceIcon} alt="wallet-icon" />
            </div>
            <h2>Pembayaran Mudah</h2>
            <p>
              Kami menyediakan berbagai opsi pembayaran yang fleksibel untuk
              memudahkan anda dalam bertransaksi.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Services;
