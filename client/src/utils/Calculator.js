export const roundToOne = (num) => {
  return +(Math.round(num + 'e+1') + 'e-1');
};

export const roundToTwo = (num) => {
  return +(Math.round(num + 'e+2') + 'e-2');
};

export default {
  roundToOne,
  roundToTwo,
};
