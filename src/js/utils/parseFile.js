import { startsWith, includes, trim, isEmpty } from 'lodash';
import { detectFileEncoding } from 'char-encoding-detector';
import Papa from 'papaparse';

import { UNABLE_TO_IMPORT, NO_MEASUREMENTS } from 'constants/messages';

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
    } else if (index === 1 || startsWith(sensor, 'F')) {
        return {
            name: 'T',
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
        measurements[1][0] = measurements[3][0];
        measurements[3][0] = null;
        measurements[1][1] = measurements[2][1];
        measurements[2][1] = measurements[3][1];
        measurements[3][1] = null;

        let previousGroup = null;

        measurements[0].forEach((column, index) => {
            if (includes(column, ':')) {
                measurements[0][index] = 'F';
            } else if (startsWith(column, "'")) {
                previousGroup = column.replace("'", 'G');
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

    let timeIndex;

    return measurements[0].reduce((result, sensor, index) => {
        const { name, type } = getSensorTypeAndName(sensor, index);

        if (type === 'time') {
            timeIndex = index;

            if (timeIndex === 1) {
                result.push({
                    sensor: name,
                    type: type,
                    name1: measurements[1][index],
                    name2: measurements[2][index],
                    unit: 's',
                    data: measurementValues.map((row, rowIndex) => [rowIndex, rowIndex]),
                    length: length
                });
            }
        } else if (type === 'marker' || (name && measurementValues[0][timeIndex])) {
            result.push({
                sensor: name,
                type: type,
                name1: measurements[1][index],
                name2: measurements[2][index],
                unit: measurements[3][index],
                data: measurementValues.map((row) => [row[timeIndex], row[index]]),
                length: length,
                advanced: measurements.advanced
            });
        }

        return result;
    }, []);
};

const splitSessions = (fileName, data) => {
    const sessions = [];
    let firstRowIndex;

    data.forEach((row, index) => {
        if (row[0] && row[1] && row[2] &&
            data[index + 1] && data[index + 1][0] && data[index + 1][2]) {
            
            if (firstRowIndex) {
                sessions.push({
                    data: data.slice(firstRowIndex, index)
                });
            }

            firstRowIndex = index;
        } else if (index === data.length - 1) {
            sessions.push({
                data: data.slice(firstRowIndex)
            });
        }
    });

    sessions.forEach((session, index) => {
        session.fileName = (sessions.length === 1) ? fileName : `${fileName} (${index + 1})`;
    });

    return sessions;
};

const handleComplete = (fileName, { data, errors }, callback) => {
    try {
        if (isEmpty(data)) {
            callback({
                name: fileName,
                errors: [{
                    message: NO_MEASUREMENTS(fileName)
                }]
            });
        } else {
            splitSessions(fileName, data).forEach((session) => {
                const name = session.fileName;
                const info = getInfo(session.data);
                const series = getSeries(session.data);
    
                setTimeout(() => {
                    callback({ name, info, series });
                }, 1);
            });
        }
    } catch (error) {
        console.log(error);

        errors.push({
            message: UNABLE_TO_IMPORT(fileName)
        });

        callback({
            name: fileName,
            errors: errors
        });
    }
};

export default (file, callback) => {
    detectFileEncoding(file).then((encoding) => {
        const config = {
            complete: (result) => handleComplete(file.name, result, callback),
            error: ({ error }) => callback({ name: file.name, errors: [error] }),
            encoding: encoding,
            worker: false,
            dynamicTyping: true,
            skipEmptyLines: true
        };
    
        Papa.parse(file, config);
    });
};
