export default function EventField({ type, id, setFormData, value, label }) {
  return (
    <>
      <label htmlFor={id} className="bold" style={{ paddingLeft: "5px" }}>
        {label}
      </label>
      <div style={{ padding: "5px" }}>
        <input
          className="event-input"
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
