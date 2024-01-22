import axios from "axios";
import { useEffect, useState } from "react";
import "../../Styles/Popular.css";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/Layout/NavBar/NavBar";

interface Game {
  id: number;
  image: string;
  name: string;
}

function UserPage() {
  const navigate = useNavigate();

  const [gameList, setGameList] = useState<Game[]>([]);

  const getGameList = async () => {
    try {
      const response = await axios.get("http://localhost:4000/allproducts");
      setGameList(response.data);

      console.log(gameList);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGameDetail = (gameId: number) => {
    navigate(`/game/${gameId}`);
  };

  useEffect(() => {
    getGameList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <NavBar />
      <section className="popular-container">
        <div className="popular-wrapper">
          <div className="popular">
            <h1>TOPUP Game Kesayangan Kamu!</h1>
            <hr style={{ marginTop: "1rem", opacity: "50%" }}></hr>
          </div>
          <div className="popular-games">
            {gameList.map((game) => (
              <>
                <div key={game.id} className="games-container">
                  <div className="games-box">
                    <img src={game.image} alt="tumbnail" />
                  </div>
                  <h1>
                    <a
                      style={{ textDecoration: "none", color: "white" }}
                      onClick={(e) => {
                        e.preventDefault();
                        handleGameDetail(game.id);
                      }}
                    >
                      {game.name}
                    </a>
                  </h1>
                </div>
              </>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default UserPage;
