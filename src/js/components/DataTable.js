import _ from 'lodash';
import React from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

export default class DataTable extends React.Component {

    createHeadCell = (measurement, index) => {
        const { type, sensor, name1, name2 } = measurement;

        if (type === 'marker') {
            return (
                <TableCell key={index} align="right">
                    <div>
                        {name1}
                    </div>
                </TableCell>
            );
        } else if (type === 'timestamp') {
            return (
                <TableCell key={index} align="right">
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
            <TableCell key={index} align="right">
                <div>
                    {`[${sensor}]`}
                </div>
                <div>
                    {name2}
                </div>
            </TableCell>
        );
    }

    createHeadCells = _.memoize((fileName) => {
        return this.props.file.series
            .filter((measurement) => measurement.type !== 'time')
            .map((measurement, index) => this.createHeadCell(measurement, index));
    })

    createRows = _.memoize((fileName) => {
        return _.times(this.props.file.series[0].length, (index) => (
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
    })

    render() {
        if (!this.props.file) {
            return null;
        }

        const { name: fileName } = this.props.file; 

        return (
            <Paper elevation={1}>
                <Table padding="dense">
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
    }
}
