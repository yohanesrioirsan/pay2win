import "../../../Styles/Cta.css";
import Pay2Win from "../../../assets/img/p2w.png";

function Cta() {
  return (
    <section className="cta">
      <div className="cta-container">
        <div className="cta-pw2-logo">
          <img src={Pay2Win} alt="" />
        </div>
        <div className="cta-action">
          <h2>
            Bergabunglah dengan Komunitas Game Kami dan Nikmati Pengalaman
            Bermain Tanpa Batas!
          </h2>
          <p>
            Anda dapat menyesuaikan layanan-layanan tersebut berdasarkan fitur
            khusus yang ditawarkan oleh situs web voucher game online Anda.
            Pastikan untuk menekankan manfaat dan keunggulan dari setiap layanan
            yang Anda tawarkan.
          </p>
          <div className="header-btn">
            <button className="btn-signup">
              <h4>Daftar Sekarang</h4>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Cta;
