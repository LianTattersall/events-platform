export default function EventField({ type, id, setFormData, value, label }) {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
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
  );
}
