import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { Input } from "../../src/components/Input";
import styled from "../../styles/OperationAdd.module.scss";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { convertBRLToUSD } from "../../src/utils/convert";
import { useEffect } from "react";
import { api } from "../../src/services/api";
import { IoReturnDownBack } from "react-icons/io5";
import Link from "next/link";
import { toast } from "react-toastify";

const CreateOperationSchema = yup.object({
  price: yup.string().required("Valor é requerido!"),
  description: yup
    .string()
    .min(3, "Descrição precisa ter no mínimo 3 letras!")
    .required(),
});
type CreateOperationFormData = {
  price: string;
  description: string;
};

export default function Add() {
  const router = useRouter();
  const { type } = router.query;
  const { register, handleSubmit, formState } =
    useForm<CreateOperationFormData>({
      resolver: yupResolver(CreateOperationSchema),
    });
  useEffect(() => {
    if (type !== "input" && type !== "output") {
      router.push("/");
    }
  }, []);

  const { errors } = formState;

  async function handleCreateOperation(values: CreateOperationFormData) {
    try {
      const data = {
        type,
        price: convertBRLToUSD(values.price),
        description: values.description,
      };
      const response = await api.post("/operations", data);
      if (response.status === 201) {
        toast.success(
          "Operação realizada com sucesso! Você será redirecionado para  a tela principal em 3 segundos"
        );
        setTimeout(() => {
          router.push("/");
        }, 3000);
      }
    } catch (error) {}
  }

  return (
    <div className={styled.container}>
      <header>
        <h3>Nova {type === "input" ? "entrada" : "saída"}</h3>
        <Link href="/">
          <a>
            <IoReturnDownBack />
          </a>
        </Link>
      </header>

      <form onSubmit={handleSubmit(handleCreateOperation)}>
        <Input
          {...register("price")}
          error={errors.price}
          name="price"
          placeholder="Valor"
          mask="currency"
          prefix="R$"
        />
        <Input
          {...register("description")}
          error={errors.description}
          name="description"
          type="text"
          placeholder="Descrição"
        />

        <Input
          type="submit"
          value={`Salvar ${type === "input" ? "entrada" : "saída"}`}
        />
      </form>
    </div>
  );
}
