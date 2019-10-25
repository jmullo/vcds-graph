import { times } from 'lodash';
import React from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Switch from '@material-ui/core/Switch';

export default class DataTable extends React.Component {

    state = {
        visible: false,
        table: null
    }

    handleToggle = () => {
        this.setState({ visible: !this.state.visible });
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
        } else if (type === 'timestamp') {
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
            .filter((measurement) => measurement.type !== 'time')
            .map((measurement, index) => this.createHeadCell(measurement, index));
    }

    createRows = () => {
        return times(this.props.file.series[0].length, (index) => (
            <TableRow key={index}>
                {
                    this.props.file.series
                        .filter((measurement) => measurement.type !== 'time')
                        .map(({ data }, index2) => (
                            <TableCell key={index2} align="right">
                                {data[index]}
                            </TableCell>
                        ))
                }
            </TableRow>
        ));
    }

    createTable = () => {
        const { name: fileName } = this.props.file;

        const table = (
            <Paper className="table" elevation={4}>
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
        if (this.state.visible !== nextState.visible ||
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
                <div className="switch">
                    <Switch size="small" color="primary"
                            checked={this.state.visible} onChange={this.handleToggle} />
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
