import * as moment from 'moment';

function serializeFetchedDbData(incomingData, sensorName) {
  return {
    name: sensorName,
    data: incomingData
      .filter((measurement) => {
        return measurement.sensor === sensorName;
      })
      .map((measurement) => {
        return {
          x: moment.unix(measurement.timestamp).format('YYYY-MM-DD HH:mm'),
          y: measurement.value,
        };
      }),
  };
}

export const fetchWeatherData = async (startTime) => {
  const [tempData, humidData, pressData] = await Promise.all([
    await fetch(`/api/temperatures?startTime=${startTime}&location=OUT`),
    await fetch(`/api/humidities?startTime=${startTime}&location=OUT`),
    await fetch(`/api/pressures?startTime=${startTime}&location=OUT`),
  ]);

  const [temperatures, humidities, pressures] = await Promise.all([
    await tempData.json(),
    await humidData.json(),
    await pressData.json(),
  ]);

  return new Promise((resolve, reject) => {
    resolve({
      temperature: [
        serializeFetchedDbData(temperatures, 'BME280'),
        serializeFetchedDbData(temperatures, 'DHT11'),
      ],
      humidity: [
        serializeFetchedDbData(humidities, 'BME280'),
        serializeFetchedDbData(humidities, 'DHT11'),
      ],
      pressure: [serializeFetchedDbData(pressures, 'BME280')],
    });
  });
};

export const fetchFlatData = async (startTime) => {
  const [tempData, humidData] = await Promise.all([
    await fetch(`/api/temperatures?startTime=${startTime}&location=LR`),
    await fetch(`/api/humidities?startTime=${startTime}&location=LR`),
  ]);

  const [temperatures, humidities] = await Promise.all([
    await tempData.json(),
    await humidData.json(),
  ]);

  return new Promise((resolve, reject) => {
    resolve({
      temperature: [serializeFetchedDbData(temperatures, 'DHT22')],
      humidity: [serializeFetchedDbData(humidities, 'DHT22')],
    });
  });
};

export const fetchPlantData = async (startTime, plant) => {
  const [soil_moistureData] = await Promise.all([
    await fetch(`/api/plants?startTime=${startTime}&plant=${plant}`),
  ]);

  const [soil_moisture] = await Promise.all([await soil_moistureData.json()]);

  return new Promise((resolve, reject) => {
    resolve({
      soil_moisture: [serializeFetchedDbData(soil_moisture, 'Soil Moisture')],
    });
  });
};

export default {
  fetchWeatherData,
  fetchFlatData,
  fetchPlantData,
};
