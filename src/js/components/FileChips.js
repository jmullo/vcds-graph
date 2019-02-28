import React from 'react';
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
                        <Chip
                            className="chip"
                            key={name}
                            label={name}
                            color={this.getColor(name)}
                            variant="outlined"
                            onClick={() => this.handleSelect(name)}
                            onDelete={() => this.props.onDelete(name)}
                        />
                    ))
                }
            </React.Fragment>
        );
    }
}
