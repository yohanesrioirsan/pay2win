import "../../Styles/Login.css";
import pw2Header from "../../assets/img/p2w-header.png";
import useSignin from "../../components/Hooks/useSignin";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const { formValues, setFormValues, handleSubmit } = useSignin();

  return (
    <main>
      <div className="login-page">
        <ToastContainer style={{ fontSize: "18px", color: "#101c45" }} />
        <div className="login-content-container">
          <div className="login-left-image">
            <img src={pw2Header} alt="p2w-header" />
          </div>
          <div className="login-form">
            <h1>Selamat Datang Kembali</h1>
            <p>Silahkan login ke akun anda.</p>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="username"
                placeholder="Username"
                onChange={(e) => {
                  setFormValues({ ...formValues, username: e.target.value });
                }}
                value={formValues.username ?? ""}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={(e) => {
                  setFormValues({ ...formValues, password: e.target.value });
                }}
                value={formValues.password ?? ""}
              />
              <p
                style={{
                  fontSize: "12px",
                  display: "flex",
                  justifyContent: "end",
                }}
              >
                <b>
                  Belum jadi member ? <a href="/">Daftar Sekarang!</a>
                </b>
              </p>
              <button type="submit" className="btn-signin">
                Sign In
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Login;
