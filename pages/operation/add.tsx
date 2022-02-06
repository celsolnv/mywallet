import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { Input } from "../../src/components/Input";
import styled from "../../styles/OperationAdd.module.scss";

export default function Add() {
  const router = useRouter();
  const { type } = router.query;
  const { register, handleSubmit, formState } = useForm({
    // resolver: yupResolver(SignInUserSchema),
  });

  const { errors } = formState;
  return (
    <div className={styled.container}>
      <h3>Nova {type}</h3>

      <form>
        <Input
          {...register("price")}
          error={errors.price}
          name="price"
          type="text"
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

        <Input type="submit" value={`Salvar ${type}`} />
      </form>
    </div>
  );
}
