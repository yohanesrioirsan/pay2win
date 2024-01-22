import NavBar from "../../components/Layout/NavBar/NavBar";
import Header from "../../components/Layout/Header/Header";
import Services from "../../components/Layout/Services/Services";
import Popular from "../../components/Layout/Popular/Popular";
import Cta from "../../components/Layout/Cta/Cta";
import Footer from "../../components/Layout/Footer/Footer";

function Home() {
  return (
    <>
      <NavBar />
      <Header />
      <main>
        <Popular />
        <Services />
        <Cta />
      </main>
      <Footer />
    </>
  );
}

export default Home;
