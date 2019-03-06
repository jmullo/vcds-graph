import React from 'react';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';

export default class FileChips extends React.Component {

    getColor = (name) => {
        return (name === this.props.selectedName) ? 'primary' : 'default';
    }

    handleSelect = (name) => {
        if (name !== this.props.selectedName) {
            this.props.onSelect(name);
        }
    }

    render() {
        return (
            <React.Fragment>
                {
                    this.props.names.map((name) => (
                        <Grid item key={name}>
                            <Chip
                                label={name}
                                color={this.getColor(name)}
                                variant="outlined"
                                onClick={(event) => {
                                    event.stopPropagation();
                                    this.handleSelect(name);
                                }}
                                onDelete={(event) => {
                                    event.stopPropagation();
                                    this.props.onDelete(name)
                                }}/>
                        </Grid>
                    ))
                }
            </React.Fragment>
        );
    }
}
