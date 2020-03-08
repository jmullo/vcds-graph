import { find, isEqual } from 'lodash';
import React from 'react';
import { Resizable } from 're-resizable';
import Paper from '@material-ui/core/Paper';
import Highcharts from 'highcharts';
import Exporting from 'highcharts/modules/exporting';
import HighchartsReact from 'highcharts-react-official';

import customTooltipRefresh from 'utils/customTooltipRefresh';
import { OPTIONS, DEFAULT_HEIGHT, MIN_HEIGHT } from 'constants/graphOptions';
import ErrorBoundary from './ErrorBoundary';

Exporting(Highcharts);
customTooltipRefresh();

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
        const { advanced, sensor, name1, name2 } = measurement;

        if (advanced) {
            return `[${sensor}] ${name1 || ''} ${name2 || ''}`;
        }

        return `[${sensor}] ${name2 || ''}`;
    }

    createYaxisName = (unit) => unit ? unit : 'common';

    createYaxis = (series) => {
        return series.reduce((result, { yAxis }) => {
            if (!find(result, { id: yAxis })) {
                result.push({
                    ...OPTIONS.yAxis,
                    id: yAxis
                });
            }

            return result;
        }, []);
    }

    parseValue = (value) => {
        const number = parseFloat(value);

        return isNaN(number) ? null : number;
    }

    sanitizeData = (data) => data.map((point) => [
        this.parseValue(point[0]),
        this.parseValue(point[1])
    ])

    createSeries = () => {
        return this.props.file.series
            .filter((measurement) => measurement.type === 'data')
            .map((measurement) => {
                const instance = {
                    name: this.createSeriesName(measurement),
                    data: this.sanitizeData(measurement.data),
                    yAxis: this.createYaxisName(measurement.unit),
                    tooltip: {
                        valueSuffix: measurement.unit
                    },
                    events: {}
                }

                instance.events.hide = () => instance.visible = false;
                instance.events.show = () => instance.visible = true;

                return instance;
        });
    }

    updateOptions = () => {
        if (!this.options) {
            this.options = { ...OPTIONS };
            this.options.subtitle.text = this.createTitle();
            this.options.series = this.createSeries();
            this.options.yAxis = this.createYaxis(this.options.series);
        }

        this.options.chart.height = this.state.height;
    }

    shouldComponentUpdate(nextProps, nextState) {
        if ((this.state.resizing && nextState.resizing) ||
            (this.props.selected === nextProps.selected &&
            isEqual(this.props.file.info, nextProps.file.info) &&
            isEqual(this.state, nextState))) {
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
                        
                        <React.Fragment>
                            {
                                this.props.selected && <div className="circle" />
                            }
                            {
                                !this.state.resizing &&
                                <HighchartsReact highcharts={Highcharts} options={this.options} />
                            }
                        </React.Fragment>
                        
                    </Resizable>
                </Paper>
            </ErrorBoundary>
        );
    }
}
