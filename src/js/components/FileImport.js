import { defer, forEach, includes, isEmpty } from 'lodash';
import React from 'react';
import Button from '@material-ui/core/Button';
import { withSnackbar } from 'notistack';

import { FileContext } from 'components/FileContext';
import parseFile from 'utils/parseFile';

class FileImport extends React.Component {

    handleParsedFile = ({ name, info, series, errors }) => {
        if (!isEmpty(errors)) {
            this.handleErrors(errors);
        } else {
            this.context.addFile({ name, info, series });
        }
    }

    handleErrors = (errors) => {
        errors.forEach(({ message }) => {
            this.props.enqueueSnackbar(message, {
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'center',
                    autoHideDuration: 5000
                }
            });
        });
    }

    handleImport = (event) => {
        forEach(event.target.files, (file) => {
            if (includes(this.context.fileNames, file.name)) {
                this.handleErrors([{
                    message: `"${file.name}" already imported.`
                }]);
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
                    <Button className="import" variant="contained" color="primary" component="span">
                        Import logs
                    </Button>
                </label>
            </React.Fragment>
        );
    }
}

FileImport.contextType = FileContext;

export default withSnackbar(FileImport);
