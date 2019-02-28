import _ from 'lodash';
import Papa from 'papaparse';

export default (file, callback) => {
    const config = {
        complete: ({ data, errors }) => callback({ file, data, errors }),
        error: ({ error }) => callback({ file, errors: [error] }),
        dynamicTyping: true
    };

    Papa.parse(file, config);
};
