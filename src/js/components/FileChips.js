import React from 'react';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';

import { withFileContext } from 'components/FileContext';

class FileChips extends React.Component {

    getColor = (name) => {
        return (name === this.props.fileContext.selectedFileName) ? 'primary' : 'default';
    }

    handleSelect = (name) => {
        if (name !== this.props.fileContext.selectedFileName) {
            this.props.fileContext.selectFile(name);
        }
    }

    render() {
        return (
            <React.Fragment>
                {
                    this.props.fileContext.fileNames.map((name) => (
                        <Grid item key={name}>
                            <Chip
                                className={"chip"}
                                label={name}
                                color={this.getColor(name)}
                                variant="outlined"
                                onClick={(event) => {
                                    event.stopPropagation();
                                    this.handleSelect(name);
                                }}
                                onDelete={(event) => {
                                    event.stopPropagation();
                                    this.props.fileContext.removeFile(name)
                                }}/>
                        </Grid>
                    ))
                }
            </React.Fragment>
        );
    }
}

export default withFileContext(FileChips);
