import { times } from 'lodash';
import React from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Switch from '@material-ui/core/Switch';

import { load, save } from 'utils/storage';
import { TABLE_VISIBLE_DEFAULT } from 'constants/uiOptions';

export default class DataTable extends React.Component {

    state = {
        visible: load('tableVisible', TABLE_VISIBLE_DEFAULT),
        table: null
    }

    handleVisibilityToggle = () => {
        this.setState({ visible: !this.state.visible });
        save('tableVisible', !this.state.visible);
    }

    createHeadCell = (measurement, index) => {
        const { advanced, type, sensor, name1, name2 } = measurement;

        if (type === 'marker') {
            return (
                <TableCell key={index} className="tableHeader narrow" align="right">
                    <div>
                        {'\u00a0'}
                    </div>
                    <div>
                        {name1}
                    </div>
                </TableCell>
            );
        } else if (type === 'time') {
            return (
                <TableCell key={index} className="tableHeader narrow" align="right">
                    <div>
                        {name1}
                    </div>
                    <div>
                        {name2}
                    </div>
                </TableCell>
            );
        }

        return (
            <TableCell key={index} className="tableHeader" align="right">
                <div>
                    {`[${sensor}]`}
                </div>
                <div>
                    {advanced ? `${name1 || ''} ${name2 || ''}` : (name2 || '')}
                </div>
            </TableCell>
        );
    }

    createHeadCells = () => {
        return this.props.file.series
            .map((measurement, index) => this.createHeadCell(measurement, index));
    }

    createRows = () => {
        return times(this.props.file.series[0].length, (index) => (
            <TableRow key={index}>
                {
                    this.props.file.series.map(({ data }, index2) => (
                        <TableCell key={index2} align="right">
                            {data[index][1]}
                        </TableCell>
                    ))
                }
            </TableRow>
        ));
    }

    createTable = () => {
        const { name: fileName } = this.props.file;
        const tableClass = this.props.limitedHeight ? 'table limitedHeight' : 'table';

        const table = (
            <Paper className={tableClass} elevation={4}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            {this.createHeadCells(fileName)}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.createRows(fileName)}
                    </TableBody>
                </Table>
            </Paper>
        );

        this.setState({ table: table });
    }

    componentDidMount() {
        setTimeout(this.createTable, 1);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.limitedHeight !== nextProps.limitedHeight) {
            setTimeout(this.createTable, 1);

            return true;
        } else if (this.state.visible !== nextState.visible ||
                   this.state.table !== nextState.table) {
            return true;
        }

        return false;
    }

    render() {
        if (!this.props.file) {
            return null;
        }

        return (
            <React.Fragment>
                <div className="tableSwitch">
                    <Switch size="small" color="primary"
                            checked={this.state.visible} onChange={this.handleVisibilityToggle} />
                </div>
                <div className={this.state.visible ? "" : "hidden"}>
                    {
                        this.state.table
                    }
                </div>
            </React.Fragment>
        );
    }
}
