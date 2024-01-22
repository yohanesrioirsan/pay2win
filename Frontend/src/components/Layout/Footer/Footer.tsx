import "../../../Styles/Footer.css";

function Footer() {
  return (
    <footer>
      <div className="footer-container">
        <hr />
        <div className="footer">
          <div className="contact">
            <h3>Butuh Bantuan?</h3>
            <button className="btn-contact">
              <h5>Hubungi Kami</h5>
            </button>
          </div>
          <div className="address">
            <h3>
              Jln. PayToWin 69 13/37 <br></br>Jakarta Barat, Daerah Khusus
              Ibukota Jakarta 12340, <br></br>Indonesia. <br></br> 0899-7173-826
            </h3>
          </div>
          <div className="socials">
            <h3>Follow Us!</h3>
            <div className="socials-icon-container">
              <div className="socials-icon"></div>
              <div className="socials-icon"></div>
              <div className="socials-icon"></div>
              <div className="socials-icon"></div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
