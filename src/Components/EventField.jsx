export default function EventField({
  type,
  id,
  setFormData,
  value,
  label,
  error,
}) {
  return (
    <>
      <label htmlFor={id} className="bold" style={{ paddingLeft: "5px" }}>
        {label}
      </label>
      <div style={{ padding: "5px" }}>
        {error ? (
          <p className="error" style={{ fontSize: "13px" }}>
            Please enter a valid {label.toLowerCase()}
          </p>
        ) : null}
        <input
          className={`event-input ${error ? "red-border" : ""}`}
          type={type}
          id={id}
          onChange={(e) => {
            setFormData((curr) => {
              const newFormData = { ...curr };
              newFormData[id] = e.target.value;
              return newFormData;
            });
          }}
          value={value}
        />
      </div>
    </>
  );
}
