import { memoize, isEqual } from 'lodash';
import React from 'react';
import { Resizable } from 're-resizable';
import Paper from '@material-ui/core/Paper';
import Highcharts from 'highcharts';
import Exporting from 'highcharts/modules/exporting';
import HighchartsReact from 'highcharts-react-official';

Exporting(Highcharts);

import { OPTIONS, DEFAULT_HEIGHT, MIN_HEIGHT } from 'constants/graphOptions';

export default class Graph extends React.Component {

    state = {
        height: DEFAULT_HEIGHT,
        resizing: false
    }

    handleResizeStop = () => {
        this.setState({ resizing: false });
    }

    handleResize = (event) => {
        const newHeight = Math.max(this.state.height + event.movementY, MIN_HEIGHT);

        this.resizable.updateSize({ height: newHeight });

        this.setState({
            height: newHeight,
            resizing: true
        });
    }

    createSeriesName = (measurement) => {
        const { sensor, name2 } = measurement;

        return `[${sensor}] ${name2}`;
    }

    createTitle = memoize((fileName) => {
        const { dateTime, versions, other } = this.props.file.info;

        return `${dateTime} - ${versions} - ${other}`;
    })

    createSeries = memoize((fileName) => {
        return this.props.file.series
            .filter((measurement) => measurement.type === 'data')
            .map((measurement) => {
                return {
                    name: this.createSeriesName(measurement),
                    data: measurement.data,
                    tooltip: {
                        valueSuffix: measurement.unit
                    }
                }
        });
    })

    shouldComponentUpdate(nextProps, nextState) {
        if (isEqual(this.props.file.info, nextProps.file.info) &&
            isEqual(this.state, nextState)) {
            return false;
        }

        return true;
    }

    render() {
        if (!this.props.file) {
            return null;
        }

        const { name: fileName } = this.props.file;
        const options = { ...OPTIONS };

        options.chart.height = this.state.height;
        options.subtitle.text = this.createTitle(fileName);
        options.series = this.createSeries(fileName);

        return (
            <Paper className="graphPaper" elevation={4}>
                <Resizable
                    className="graph"
                    defaultSize={{
                        height: this.state.height
                    }}
                    minHeight={MIN_HEIGHT}
                    onResizeStop={this.handleResizeStop}
                    onResize={this.handleResize}
                    ref={(component) => { this.resizable = component; }}
                    enable={{
                        top: false,
                        right: false,
                        bottom: true,
                        left: false,
                        topRight: false,
                        bottomRight: false,
                        bottomLeft: false,
                        topLeft: false
                    }}>
                    {
                        !this.state.resizing &&
                        <HighchartsReact highcharts={Highcharts} options={options} />
                    }
                </Resizable>
            </Paper>
        );
    }
}
