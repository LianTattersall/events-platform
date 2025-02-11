export default function EventField({ type, id, setter, value, label }) {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        onChange={(e) => {
          setter(e.target.value);
        }}
        value={value}
      />
    </div>
  );
}
