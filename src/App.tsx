import { DS } from "./DS";
import styled from "styled-components";
import { useCallback, useState } from "react";

const EditableField = ({
  value,
  description,
}: {
  value: number;
  description: string;
}) => {
  const [showInput, showInputUpdate] = useState(false);
  const handleClick = useCallback(() => {
    showInputUpdate(!showInput);
  }, [showInput]);

  return showInput ? (
    <input type="text" value={value} placeholder={description} />
  ) : (
    <li onClick={handleClick}>(y)${value}.00</li>
  );
};

const Entries = ({ value }: { value: Expense[] }) => {
  return (
    <ul>
      {value.map((e) => (
        <li>
          {e.description}:{" "}
          <EditableField
            value={e.yearlyAmount}
            description="yearly"
          ></EditableField>
          , (m)$
          {e.yearlyAmount / 12}
          .00, (f)${e.yearlyAmount / 26}.00,, (w)${e.yearlyAmount / 56}.00,
        </li>
      ))}
    </ul>
  );
};

interface Expense {
  yearlyAmount: number;
  description: string;
}

const Budget = () => {
  let values: number[] = new Array();
  values.push(2000);
  values.push(5000);
  values.push(7000);

  // const entries: number[] = [
  const entries: Expense[] = [
    { yearlyAmount: 10, description: "example" },
    { yearlyAmount: 20, description: "example 2" },
  ];
  return (
    <>
      <h1>Budget</h1>
      <Entries value={entries} />
      <Total />
    </>
  );
};

const Total = () => {
  return <></>;
};

const App = () => {
  return <Budget />;
};

export const NoStyleList = styled.ul`
  padding: 0;
  margin: 0;

  list-style: none;

  display: grid;
  gap: ${DS.margins.micro};
`;

export default App;
