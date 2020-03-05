import { forEach, includes, isEmpty } from 'lodash';
import React from 'react';
import Button from '@material-ui/core/Button';
import { withSnackbar } from 'notistack';

import { FileContext } from 'components/FileContext';
import parseFile from 'utils/parseFile';
import { ALREADY_IMPORTED } from 'constants/messages';

class FileImport extends React.Component {

    handleParsedFile = ({ name, info, series, errors }) => {
        if (includes(this.context.fileNames, name)) {
            this.handleErrors([{
                message: ALREADY_IMPORTED(name)
            }]);
        } else if (!isEmpty(errors)) {
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
            setTimeout(() => {
                parseFile(file, this.handleParsedFile);
            }, 1);
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
