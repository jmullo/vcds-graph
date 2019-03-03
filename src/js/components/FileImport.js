import React from 'react';
import Button from '@material-ui/core/Button';

import parseFile from 'utils/parseFile';

export default class FileImport extends React.Component {

    handleParsedFile = ({ name, info, series, errors }) => {
        const parsedFile = {
            name,
            info,
            series
        };

        this.props.onChange(parsedFile);
    }

    handleImport = (event) => {
        _.forOwn(event.target.files, (file) => {
            if (_.includes(this.props.names, file.name)) {
                console.log('File already imported!');
            } else {
                parseFile(file, this.handleParsedFile);
            }
        });
    }

    render() {
        return (
            <React.Fragment>
                <input id="input" accept=".csv" type="file" value="" multiple
                       onChange={this.handleImport}/>
                       
                <label htmlFor="input">
                    <Button variant="contained" color="primary" component="span">
                        Import logs
                    </Button>
                </label>
            </React.Fragment>
        );
    }
}
