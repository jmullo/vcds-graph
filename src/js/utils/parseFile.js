import { startsWith, includes, trim } from 'lodash';
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

const isAdvanced = (measurements) => !measurements[0][0] && measurements[0][1];

const harmonize = (measurements) => {
    if (isAdvanced(measurements)) {
        measurements.advanced = true;
        measurements[0][1] = null;

        let previousGroup = null;

        measurements[0].forEach((column, index) => {
            if (includes(column, ':')) {
                measurements[0][index] = 'F';
            } else if (startsWith(column, "'")) {
                previousGroup = column.replace("'", '');
                measurements[0][index] = previousGroup;
            } else if (column === null) {
                measurements[0][index] = previousGroup;
            } else {
                measurements[0][index] = null;
            }
        });
    }

    return measurements
};

const getSeries = (data) => {
    const measurements = harmonize(data.slice(2, 6));
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
                length: length,
                advanced: measurements.advanced
            });
        }

        return result;
    }, []);
};

const handleComplete = (fileName, { data, errors }, callback) => {
    try {
        callback({
            name: fileName,
            info: getInfo(data),
            series: getSeries(data)
        });
    } catch {
        errors.push({
            message: `Unable to import "${fileName}". Try another log file or contact: jussi.mullo@iki.fi`
        });

        callback({
            name: fileName,
            errors: errors
        });
    }
};

export default (file, callback) => {
    const config = {
        complete: (result) => handleComplete(file.name, result, callback),
        error: ({ error }) => callback({ name: file.name, errors: [error] }),
        encoding: 'windows-1252',
        worker: false,
        dynamicTyping: true,
        skipEmptyLines: true
    };

    Papa.parse(file, config);
};
