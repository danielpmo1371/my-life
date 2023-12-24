export default function AdvancedEditView(originalValue: any) {
  return (
    <>
      <textarea
        style={{
          width: "80%",
          height: "80%",
          boxSizing: "border-box",
          overflow: "scroll",
        }}
        rows={30}
        value={JSON.stringify(originalValue, null, 4)}
      />
    </>
  );
}
