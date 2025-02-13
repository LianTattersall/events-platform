export function dateConverter(date) {
  const dateComponents = date.split("-");
  const months = {
    1: "January",
    2: "February",
    3: "March",
    4: "April",
    5: "May",
    6: "June",
    7: "July",
    8: "August",
    9: "September",
    10: "October",
    11: "November",
    12: "December",
  };

  return `${Number(dateComponents[2])} ${months[Number(dateComponents[1])]} ${
    dateComponents[0]
  }`;
}
