import React from 'react';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';

import { FileContext } from 'components/FileContext';

class FileChips extends React.Component {

    getColor = (name) => {
        return (name === this.context.selectedFileName) ? 'primary' : 'default';
    }

    handleSelect = (name) => {
        if (name !== this.context.selectedFileName) {
            this.context.selectFile(name);
        }
    }

    render() {
        return (
            <Grid container spacing={0}>
                {
                    this.context.fileNames.map((name) => (
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
                                    this.context.removeFile(name)
                                }}/>
                        </Grid>
                    ))
                }
            </Grid>
        );
    }
}

FileChips.contextType = FileContext;

export default FileChips;
