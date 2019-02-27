import React from 'react';
import Button from '@material-ui/core/Button';

export default class FileImport extends React.Component {

    handleImport = (event) => {
        const { files } = event.target;
        const newFiles = [];

        _.forOwn(files, (file) => {
            if (_.includes(this.props.names, file.name)) {
                
            } else {
                newFiles.push(file);
            }
        });

        if (!_.isEmpty(newFiles)) {
            this.props.onChange(newFiles);
        }
    }

    render() {
        return (
            <React.Fragment>
                <input id="input" accept=".csv" type="file" multiple onChange={this.handleImport}/>
                <label htmlFor="input">
                    <Button variant="contained" color="primary" component="span">
                        Import files
                    </Button>
                </label>
            </React.Fragment>
        );
    }
}
