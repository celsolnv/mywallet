import Link from "next/link";
import { Input } from "../src/components/Input";
import styled from "../styles/Register.module.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { api } from "../src/services/api";
import { setCookie } from "nookies";
import { AxiosError } from "axios";
import { useRouter } from "next/router";

const CreateUserFormSchema = yup.object().shape({
  name: yup.string().required("Nome obrigatório"),
  email: yup.string().required("E-mail Obrigatório").email("E-mail inválido"),
  password: yup
    .string()
    .required("Senha obrigatória")
    .min(6, "No mínimo 6 caracteres"),
  password_confirmation: yup
    .string()
    .oneOf([null, yup.ref("password")], "As senhas precisam ser iguais"),
});
type CreateUserFormData = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export default function Register() {
  const { register, handleSubmit, formState } = useForm<CreateUserFormData>({
    resolver: yupResolver(CreateUserFormSchema),
  });

  const router = useRouter();

  const { errors } = formState;

  const handleCreateUser = async (data: CreateUserFormData) => {
    try {
      const response = await api.post("/register", data);
      router.push("/login");
    } catch (error) {}
  };
  return (
    <div className={styled.container}>
      <h2 className={styled.title}>MyWallet</h2>
      <form onSubmit={handleSubmit(handleCreateUser)}>
        <Input
          {...register("name")}
          error={errors.name}
          type="text"
          name="name"
          placeholder="Nome"
        />
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
        <Input
          {...register("password_confirmation")}
          error={errors.password_confirmation}
          type="password"
          name="password_confirmation"
          placeholder="Confirme a senha"
        />

        <Input type="submit" value="Cadastrar" />
        <Link href="/login">
          <a>Já tem uma conta? Entre agora!</a>
        </Link>
      </form>
    </div>
  );
}
