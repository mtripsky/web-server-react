export const MapKeyToUnit = (key) => {
  switch (key) {
    case 'temperature':
      return ' [°C]';
    case 'humidity':
      return ' [%]';
    case 'pressure':
      return ' [hPa]';
    case 'soil_moisture':
      return ' [%]';
    default:
      return ' [%]';
  }
};

export const MapKeyToLabelString = (key) => {
  let result = '';
  key.split('_').map((word) => {
    result += word.charAt(0).toUpperCase() + word.slice(1) + ' ';
  });
  return result;
};

// FIX-ME: min and max are hard-coded, but it should take in future data to find min and max
export const MapYAxisTicks = (key) => {
  switch (key) {
    case 'temperature':
      return {
        suggestedMin: 15,
        suggestedMax: 30,
        display: true,
        stepSize: 5,
        // padding: 12,
      };
    case 'humidity':
      return {
        suggestedMin: 30,
        suggestedMax: 90,
        display: true,
        stepSize: 10,
      };
    case 'pressure':
      return {
        suggestedMin: 1014,
        suggestedMax: 1024,
        display: true,
        stepSize: 2,
      };
    case 'soil_moisture':
      return {
        suggestedMin: 30,
        suggestedMax: 90,
        display: true,
        stepSize: 10,
      };
    default:
      return {
        display: true,
      };
  }
};

export const GetColors = () => {
  return ['#ff0000', '#0000ff', '#00ff00', '#ff00ff', '#00ffff', '#ffff00'];
};
