import { defer, forOwn, includes } from 'lodash';
import React from 'react';
import Button from '@material-ui/core/Button';

import { FileContext } from 'components/FileContext';
import parseFile from 'utils/parseFile';

class FileImport extends React.Component {

    handleParsedFile = ({ name, info, series, errors }) => {
        const parsedFile = { name, info, series };

        this.context.addFile(parsedFile);
    }

    handleImport = (event) => {
        forOwn(event.target.files, (file) => {
            if (includes(this.props.names, file.name)) {
                console.log('File already imported!');
            } else {
                defer(() => {
                    parseFile(file, this.handleParsedFile);
                });
            }
        });
    }

    render() {
        return (
            <React.Fragment>
                <input id="input" accept=".csv" type="file" value="" multiple onChange={this.handleImport}/>
                <label htmlFor="input">
                    <Button variant="contained" color="primary" component="span">
                        Import logs
                    </Button>
                </label>
            </React.Fragment>
        );
    }
}

FileImport.contextType = FileContext;

export default FileImport;
