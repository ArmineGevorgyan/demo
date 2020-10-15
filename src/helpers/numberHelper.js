export const numberToCashFormatter = (num = 0) => {
  if (num >= 1000000000) {
    return "$" + (num / 1000000000).toFixed(2).replace(/(\.0+|0+)$/, "") + "B";
  }

  if (num >= 1000000) {
    return "$" + (num / 1000000).toFixed(2).replace(/(\.0+|0+)$/, "") + "M";
  }

  if (num >= 1000) {
    return "$" + (num / 1000).toFixed(2).replace(/(\.0+|0+)$/, "") + "K";
  }

  return "$" + num;
};
