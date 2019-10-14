import { startsWith, trim } from 'lodash';
import Papa from 'papaparse';

const getInfo = (data) => {
    return {
        dateTime: data[0].slice(0, 5).join(' '),
        versions: data[0].slice(5).join(', '),
        other: trim(data[1].join(', '), [' ', ','])
    };
};

const getSensorTypeAndName = (sensor, index) => {
    if (index === 0) {
        return {
            name: 'M',
            type: 'marker'
        }
    } else if (index === 1) {
        return {
            name: 'T',
            type: 'timestamp'
        }
    } else if (startsWith(sensor, 'F')) {
        return {
            name: sensor,
            type: 'time'
        }
    }

    return {
        name: sensor,
        type: 'data'
    }
};

const getSeries = (data) => {
    const measurements = data.slice(2, 6);
    const measurementValues = data.slice(6);
    const length = measurementValues.length;

    return measurements[0].reduce((result, sensor, index) => {
        const { name, type } = getSensorTypeAndName(sensor, index);

        if (name) {
            result.push({
                sensor: name,
                type: type,
                name1: measurements[1][index],
                name2: measurements[2][index],
                unit: measurements[3][index],
                data: measurementValues.map((row) => row[index]),
                length: length
            });
        }

        return result;
    }, []);
}

export default (file, callback) => {
    const config = {
        complete: ({ data, errors }) => callback({
            name: file.name,
            info: getInfo(data),
            series: getSeries(data),
            errors
        }),
        error: ({ error }) => callback({ file, errors: [error] }),
        encoding: 'windows-1252',
        worker: false,
        dynamicTyping: true,
        skipEmptyLines: true
    };

    Papa.parse(file, config);
};
