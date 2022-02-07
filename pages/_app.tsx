import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { AuthProvider } from "../src/contexts/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
      <ToastContainer
        toastStyle={{ background: "##A328D6" }}
        style={{ background: "##A328D6" }}
        theme="light"
        autoClose={3000}
        position="top-right"
      />
    </AuthProvider>
  );
}

export default MyApp;
