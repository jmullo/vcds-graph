import { isEqual } from 'lodash';
import React from 'react';
import { Resizable } from 're-resizable';
import Paper from '@material-ui/core/Paper';
import Highcharts from 'highcharts';
import Exporting from 'highcharts/modules/exporting';
import HighchartsReact from 'highcharts-react-official';

Exporting(Highcharts);

import { OPTIONS, DEFAULT_HEIGHT, MIN_HEIGHT } from 'constants/graphOptions';
import ErrorBoundary from './ErrorBoundary';

export default class Graph extends React.Component {

    state = {
        height: DEFAULT_HEIGHT,
        resizing: false
    }

    options = null;

    handleResizeStop = (event, direction, ref, delta) => {
        const newHeight = Math.max(this.state.height + delta.height, MIN_HEIGHT);

        this.setState({
            height: newHeight,
            resizing: false
        });
    }

    handleResize = () => {
        if (!this.state.resizing) {
            this.setState({ resizing: true });
        }
    }

    createTitle = () => {
        const { name } = this.props.file;
        const { dateTime, versions, other } = this.props.file.info;

        return `${name} - ${dateTime} - ${versions} - ${other}`;
    }

    createSeriesName = (measurement) => {
        const { sensor, name2 } = measurement;

        return `[${sensor}] ${name2}`;
    }

    createSeries = () => {
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
    }

    updateOptions = () => {
        if (!this.options) {
            this.options = { ...OPTIONS };
            this.options.subtitle.text = this.createTitle();
            this.options.series = this.createSeries();
        }

        this.options.chart.height = this.state.height;
    }

    shouldComponentUpdate(nextProps, nextState) {
        if ((this.state.resizing && nextState.resizing) ||
            isEqual(this.props.file.info, nextProps.file.info) &&
            isEqual(this.state, nextState)) {
            return false;
        }

        return true;
    }

    render() {
        if (!this.props.file) {
            return null;
        }

        this.updateOptions();

        return (
            <ErrorBoundary>
                <Paper elevation={4}>
                    <Resizable
                        className="graph"
                        defaultSize={{
                            height: this.state.height
                        }}
                        minHeight={MIN_HEIGHT}
                        onResizeStop={this.handleResizeStop}
                        onResize={this.handleResize}
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
                            <HighchartsReact highcharts={Highcharts} options={this.options} />
                        }
                    </Resizable>
                </Paper>
            </ErrorBoundary>
        );
    }
}
