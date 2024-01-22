import { useNavigate } from "react-router-dom";
import "../../../Styles/Header.css";
import headerImage from "../../../assets/img/p2w-header.png";

function Header() {
  const navigate = useNavigate();

  const handleBtn = () => {
    navigate("/signup");
  };

  return (
    <header>
      <section className="hero">
        <div className="hero-left">
          <h1>
            Pay<span className="blocked-text">2WiN</span>
          </h1>
          <p>
            Dapatkan Pengalaman Bermain Tanpa Batas dengan Voucher Game Online
            Terbaik. TopUp game kesayangan kalian dengan cepat dan aman dengan
            P2W.
          </p>
          <div className="header-btn">
            <button className="btn-signup" onClick={() => handleBtn()}>
              <h4>Daftar Sekarang</h4>
            </button>
          </div>
        </div>
        <div className="hero-right">
          <img src={headerImage} alt="" />
        </div>
      </section>

      <div className="desktop-wave">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#101C45"
            fill-opacity="1"
            d="M0,192L60,176C120,160,240,128,360,128C480,128,600,160,720,149.3C840,139,960,85,1080,74.7C1200,64,1320,96,1380,112L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          ></path>
        </svg>
      </div>

      <div className="mobile-wave">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#101C45"
            fill-opacity="1"
            d="M0,160L26.7,138.7C53.3,117,107,75,160,101.3C213.3,128,267,224,320,234.7C373.3,245,427,171,480,144C533.3,117,587,139,640,128C693.3,117,747,75,800,85.3C853.3,96,907,160,960,181.3C1013.3,203,1067,181,1120,192C1173.3,203,1227,245,1280,266.7C1333.3,288,1387,288,1413,288L1440,288L1440,320L1413.3,320C1386.7,320,1333,320,1280,320C1226.7,320,1173,320,1120,320C1066.7,320,1013,320,960,320C906.7,320,853,320,800,320C746.7,320,693,320,640,320C586.7,320,533,320,480,320C426.7,320,373,320,320,320C266.7,320,213,320,160,320C106.7,320,53,320,27,320L0,320Z"
          ></path>
        </svg>
      </div>
    </header>
  );
}

export default Header;
