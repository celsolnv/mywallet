import { Input } from "../src/components/Input";
import styled from "../styles/Login.module.scss";
import Link from "next/link";
import * as yup from "yup";
import { useRouter } from "next/router";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { SubmitHandler } from "react-hook-form";
import { api } from "../src/services/api";
import { useContext } from "react";
import { AuthContext } from "../src/contexts/AuthContext";

type SignInFormData = {
  email: string;
  password: string;
};

const SignInUserSchema = yup.object({
  email: yup.string().required("E-mail é necessário").email("E-mail inválido"),
  password: yup.string().required("Senha é necessária"),
});

export default function Home() {
  const { singIn } = useContext(AuthContext);

  const { register, handleSubmit, formState } = useForm<SignInFormData>({
    resolver: yupResolver(SignInUserSchema),
  });

  const router = useRouter();

  const { errors } = formState;

  const handleSignInUser = async (data: SignInFormData) => {
    try {
      await singIn(data);
    } catch (error) {}
  };

  return (
    <div className={styled.container}>
      <h2 className={styled.title}>MyWallet</h2>
      <form onSubmit={handleSubmit(handleSignInUser)}>
        {/* <form onSubmit={logar}> */}
        <Input
          {...register("email")}
          error={errors.email}
          type="text"
          name="email"
          placeholder="E-mail"
        />
        <Input
          {...register("password")}
          error={errors.password}
          type="password"
          name="password"
          placeholder="Senha"
        />

        <Input type="submit" value="Entrar" />

        <Link href="/register">
          <a>Primeira vez? Cadastre-se!</a>
        </Link>
      </form>
    </div>
  );
}
