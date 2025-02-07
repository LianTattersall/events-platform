export default function Pagination({ p, setP, maxP }) {
  function goToNext() {
    setP((curr) => curr + 1);
  }

  function goToPrev() {
    if (p >= maxP.current) {
      setP(maxP.current - 1);
    } else {
      setP((curr) => Math.max(1, curr - 1));
    }
  }
  return (
    <>
      <button onClick={goToPrev}>Previous</button>
      <button onClick={goToNext}>Next</button>
    </>
  );
}
