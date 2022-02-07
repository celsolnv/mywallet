import styled from "./style.module.scss";
interface OperationRowProps {
  description: string;
  price: number;
  date?: string;
  type: "input" | "output";
}

export function OperationRow({
  type,
  date,
  description,
  price,
}: OperationRowProps) {
  return (
    <div className={styled.container}>
      <div>
        <time>{date}</time> <span>{description}</span>
      </div>

      <div>
        <span className={styled[type]}>{price}</span>
      </div>
    </div>
  );
}
