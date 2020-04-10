export const MapKeyToUnit = (key) => {
  switch (key) {
    case 'temperature':
      return ' [°C]';
    case 'humidity':
      return ' [%]';
    case 'pressure':
      return ' [hPa]';
    case 'soil-moisture':
      return ' [%]';
    default:
      return '';
  }
};

export const FirstLetterToUpper = (word) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

export const GetColors = (arraySize) => {
  const a = 255;
  let array = [];
  array.push('rgb(255,0,0)');

  if (arraySize > 1) {
    const step = (a * Math.sqrt(3)) / (arraySize - 1);
    for (let i = 1; i < arraySize; ++i) {
      const r = Math.ceil(a - Math.sin((35 * Math.PI) / 180) * step * i);
      const b = Math.floor(
        Math.cos((35 * Math.PI) / 180) *
          step *
          i *
          Math.cos((45 * Math.PI) / 180)
      );
      const g = Math.floor(
        Math.cos((35 * Math.PI) / 180) *
          step *
          i *
          Math.cos((45 * Math.PI) / 180)
      );
      array.push('rgb(' + r + ', ' + g + ', ' + b + ')');
    }
  }

  return array;
};
