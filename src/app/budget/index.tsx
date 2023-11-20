
export default function Budget() {
  return (
    <>
      <h1>Budget</h1>
    </>
  );
}
// import { useCallback, useState, useRef, useEffect } from "react";
// import styled from "styled-components";
// // import { v4 as uuidv4 } from "uuid";

// const EditableField = ({
//   fieldKey,
//   value,
//   description,
//   updateValue,
// }: {
//   fieldKey: string;
//   value: string;
//   description: string;
//   updateValue: (value: any, key: any) => void;
// }) => {
//   // if (description === "uniqueId") {
//   //   console.log(`EditableField: re-rendering ${description}`);
//   //   console.log(`EditableField-key: ${fieldKey}`);
//   //   console.log(`EditableField-value: ${value}`);
//   // }
//   const node = useRef<any>();

//   const [showInput, showInputUpdate] = useState(false);

//   const handleClick = useCallback((e) => {
//     if (node.current && node.current.contains(e.target)) {
//       showInputUpdate(true);
//     } else if (node.current) showInputUpdate(false);
//   }, []);

//   const handleEnter = useCallback(() => {
//     console.log(node.current);
//     updateValue(node.current.value, fieldKey);
//     showInputUpdate(!showInput);
//   }, [fieldKey, showInput, updateValue]);

//   const handleKeys = useCallback(
//     (e) => {
//       if (e.keyCode === 13) handleEnter();
//     },
//     [handleEnter]
//   );

//   useEffect(() => {
//     if (showInput) document.addEventListener("keydown", handleKeys);
//     document.addEventListener("mousedown", handleClick);

//     return () => {
//       document.removeEventListener("keydown", handleKeys);
//       document.removeEventListener("mousedown", handleClick);
//     };
//   }, [handleClick, handleKeys, showInput]);

//   return showInput ? (
//     <input
//       type="text"
//       defaultValue={value}
//       placeholder={description}
//       ref={node}
//     />
//   ) : (
//     <div
//       style={{
//         margin: "2px 20px",
//         border: "solid",
//         borderColor: "green",
//         flex: 1,
//         borderRadius: "9px",
//       }}
//       onClick={handleClick}
//       ref={node}
//     >
//       {value}
//     </div>
//   );
// };

// // const EditableExpense = ({ yearlyValue }: { yearlyValue: number }) => {
// //   return <div style={{ display: "flex" }}></div>;
// // };

// const Entries = ({
//   entries,
//   updateEntries,
// }: {
//   entries: Expense[];
//   updateEntries: React.Dispatch<any>;
// }) => {
//   const updateUniqueId = useCallback(
//     (value, key) => {
//       console.log(`value: ${value}`);
//       console.log(`key: ${key}`);
//       console.log(entries);

//       const entryIndex = entries.findIndex((exp) => {
//         console.log(exp);

//         return exp.yearlyAmount.toString() === key;
//       });

//       console.log(entryIndex);
//       console.log(entries[entryIndex]);

//       if (entries[entryIndex]) {
//         console.log(`entry expId: ${entries[entryIndex].expenseId}`);

//         entries[entryIndex].expenseId = value;

//         console.log(`entry expId: ${entries[entryIndex].expenseId}`);

//         console.log(entries);
//         localStorage.setItem("budgetExpenses", JSON.stringify(entries));

//         updateEntries(entries);
//         console.log(entries);
//       }
//     },
//     [entries, updateEntries]
//   );

//   const updateExpenseValue = useCallback(
//     (value, key) => {
//       console.log(value);
//       console.log(key);
//       console.log(entries);

//       const entryIndex = entries.findIndex((exp) => {
//         console.log(exp);

//         return exp.expenseId === key;
//       });

//       console.log(entryIndex);

//       entries[entryIndex].yearlyAmount = value;

//       updateEntries(entries);
//     },
//     [entries, updateEntries]
//   );

//   const updateMonthlyExpenseValue = useCallback(
//     (value, key) => updateExpenseValue(value * 12, key),
//     [updateExpenseValue]
//   );

//   const updateFortnightlyExpenseValue = useCallback(
//     (value, key) => updateExpenseValue(value * 26, key),
//     [updateExpenseValue]
//   );

//   const updateWeeklyExpenseValue = useCallback(
//     (value, key) => updateExpenseValue(value * 52, key),
//     [updateExpenseValue]
//   );

//   const updateExpenseDescription = useCallback(
//     (value, key) => {
//       console.log(value);
//       console.log(key);
//       console.log(entries);

//       const entryIndex = entries.findIndex((exp) => {
//         console.log(exp);

//         return exp.expenseId === key;
//       });

//       console.log(entryIndex);

//       entries[entryIndex].description = value;

//       updateEntries(entries);
//     },
//     [entries, updateEntries]
//   );

//   return (
//     <NoStyleList>
//       {entries.map((expense) => {
//         console.log(expense);
//         console.log(expense.yearlyAmount.toString());
//         console.log(expense.expenseId);
//         return (
//           <li key={expense.expenseId}>
//             <div style={{ display: "flex" }}>
//               <EditableField
//                 fieldKey={expense.yearlyAmount.toString()}
//                 value={expense.expenseId}
//                 description="uniqueId"
//                 updateValue={updateUniqueId}
//               ></EditableField>
//               <EditableField
//                 fieldKey={expense.expenseId}
//                 value={expense.description}
//                 description="description"
//                 updateValue={updateExpenseDescription}
//               ></EditableField>
//               <EditableField
//                 fieldKey={expense.expenseId}
//                 value={expense.yearlyAmount.toFixed(2)}
//                 description="yearly"
//                 updateValue={updateExpenseValue}
//               ></EditableField>
//               <EditableField
//                 fieldKey={expense.expenseId}
//                 value={(expense.yearlyAmount / 12).toFixed(2)}
//                 description="monthly"
//                 updateValue={updateMonthlyExpenseValue}
//               ></EditableField>
//               <EditableField
//                 fieldKey={expense.expenseId}
//                 value={(expense.yearlyAmount / 26).toFixed(2)}
//                 description="fortnightly"
//                 updateValue={updateFortnightlyExpenseValue}
//               ></EditableField>
//               <EditableField
//                 fieldKey={expense.expenseId}
//                 value={(expense.yearlyAmount / 52).toFixed(2)}
//                 description="weekly"
//                 updateValue={updateWeeklyExpenseValue}
//               ></EditableField>
//             </div>
//           </li>
//         );
//       })}
//     </NoStyleList>
//   );
// };

// interface Expense {
//   expenseId: string;
//   yearlyAmount: number;
//   description: string;
// }
// const Budget = () => {

//   const seedValue: Expense[] = [{ expenseId: '1', yearlyAmount:1000, description: 'exmpale 01' }, 
//    { expenseId: '2', yearlyAmount:200, description: 'exmpale 02' }]; 

//   const [entries, setEntries] = useState(() => {
//     // const saved = localStorage.getItem("budgetExpenses");
//     // const initialValue = saved && JSON.parse(saved);
//     // return initialValue || JSON.stringify(seedValue);
//    return seedValue;
//   });

//   const entriesHandler = (updatedEntries: Expense[]) => {
//     console.log(`entries:`);
//     console.log(entries);
//     console.log(`updated: `);
//     console.log(updatedEntries);
//     setEntries(updatedEntries);
//   };

//   useEffect(() => {
//     console.log(`UPDATING LStorage:`);
//     console.log(entries);

//     localStorage.setItem("budgetExpenses", JSON.stringify(entries));
//   }, [entries]);

//   return (
//     <>
//       <h1>Budget</h1>
//       <Entries entries={[...entries]} updateEntries={entriesHandler} />
//       <Total />
//     </>
//   );
// };

// const Total = () => {
//   return <></>;
// };

// const App = () => {
//   return <Budget />;
// };

// export const NoStyleList = styled.ul`
//   padding: 0;
//   margin: 0;

//   list-style: none;

//   display: grid;
//   gap: ${DS.margins.micro};
// `;

// export default App;
