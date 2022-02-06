import { GetServerSideProps } from "next";
import { useContext } from "react";
import { AuthContext } from "../src/contexts/AuthContext";
import { withSSRAuth } from "../src/utils/withSSRAuth";
import styled from "../styles/Home.module.scss";
import { IoExitOutline } from "react-icons/io5";
import { GrAddCircle, GrSubtractCircle } from "react-icons/gr";
import { useRouter } from "next/router";

export default function Home() {
  const { user, singOut } = useContext(AuthContext);
  const router = useRouter();

  function handleRedirect(type: string) {
    router.push(`/operation/add?type=${type}`);
    return;
  }
  return (
    <div className={styled.container}>
      <header>
        <h3>Olá, {user?.name}</h3>
        <button onClick={singOut}>
          <IoExitOutline />
        </button>
      </header>
      <div className={styled.extract}>
        <p>Não há registros de entrada ou saída</p>
      </div>
      <footer>
        <button onClick={() => handleRedirect("entrada")}>
          <GrAddCircle />
          <span>Nova entrada</span>
        </button>
        <button onClick={() => handleRedirect("saida")}>
          <GrSubtractCircle />
          <span>Nova saída</span>
        </button>
      </footer>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = withSSRAuth(async () => {
  return {
    props: {},
  };
});
