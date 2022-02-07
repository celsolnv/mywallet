import { GetServerSideProps } from "next";
import { useContext, useState } from "react";
import { AuthContext } from "../src/contexts/AuthContext";
import { withSSRAuth } from "../src/utils/withSSRAuth";
import styled from "../styles/Home.module.scss";
import { IoExitOutline } from "react-icons/io5";
import { GrAddCircle, GrSubtractCircle } from "react-icons/gr";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { api } from "../src/services/api";
import { OperationRow } from "../src/components/OperationRow";

type Operation = {
  id: number;
  description: string;
  price: number;
  create_at?: Date;
  date?: string;
  type: "input" | "output";
};

export default function Home() {
  const [operations, setOperations] = useState<Array<Operation>>([]);
  const [balance, setBalance] = useState("");
  const { user, singOut } = useContext(AuthContext);
  const router = useRouter();
  let balanceTotal = 0;

  useEffect(() => {
    api.get("/operations").then((response) => {
      const operationsFormatted = response.data.map((operation: Operation) => {
        return {
          id: operation.id,
          description: operation.description,
          type: operation.type,
          price: new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(operation.price),
          date: new Intl.DateTimeFormat("pt-BT", {
            day: "2-digit",
            month: "2-digit",
          }).format(new Date(operation.create_at)),
        };
      });
      setOperations(operationsFormatted);

      balanceTotal = response.data.reduce((acc, operation) => {
        if (operation.type === "output") {
          return acc - operation.price;
        }
        return acc + operation.price;
      }, 0);

      setBalance(
        new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(balanceTotal)
      );
    });
  }, []);

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
        {operations.length === 0 ? (
          <p>Não há registros de entrada ou saída</p>
        ) : (
          operations.map((operation) => (
            <OperationRow
              key={operation.id}
              date={operation.date}
              description={operation.description}
              price={operation.price}
              type={operation.type}
            />
          ))
        )}
        {!!balance && (
          <div className={styled.balance}>
            <strong>SALDO</strong>
            <span
              {...(balanceTotal > 0
                ? { className: styled["green"] }
                : { className: styled["red"] })}
            >
              {balance}
            </span>
          </div>
        )}
      </div>

      <footer>
        <button onClick={() => handleRedirect("input")}>
          <GrAddCircle />
          <span>Nova entrada</span>
        </button>
        <button onClick={() => handleRedirect("output")}>
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
