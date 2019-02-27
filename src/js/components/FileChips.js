import React from 'react';
import Chip from '@material-ui/core/Chip';

export default class FileChips extends React.Component {

    getColor = (name) => {
        return (name === this.props.selected) ? 'secondary' : 'default';
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
                            onClick={() => this.props.onSelect(name)}
                            onDelete={() => this.props.onDelete(name)}
                        />
                    ))
                }
            </React.Fragment>
        );
    }
}
