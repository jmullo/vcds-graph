import _ from 'lodash';
import React from 'react';
import Paper from '@material-ui/core/Paper';
import Highcharts from 'highcharts';
import Exporting from 'highcharts/modules/exporting';
import Boost from 'highcharts/modules/boost';
import HighchartsReact from 'highcharts-react-official';

Exporting(Highcharts);
//Boost(Highcharts);

export default class Graph extends React.Component {

    createTitle = () => {
        const { dateTime, versions, other } = this.props.file.info;
        
        return `${dateTime} - ${versions} - ${other}`;
    }

    createSeriesName = (measurement) => {
        const { sensor, name1, name2 } = measurement;

        return `[${sensor}] ${name2}`;
    }

    createSeries = () => {
        return this.props.file.series
            .filter((measurement) => measurement.type === 'data')
            .map((measurement) => {
                return {
                    name: this.createSeriesName(measurement),
                    data: measurement.data
                }
        });
    }

    render() {
        if (!this.props.file) {
            return null;
        }

        const options = {
            credits: {
                enabled: false
            },
            chart: {
                type: 'line',
                animation: false,
                spacing: [2, 2, 2, 2],
                panning: true,
                panKey: 'ctrl',
                zoomType: 'x'
            },
            title: {
                text: null
            },
            subtitle: {
                text: this.createTitle()
            },
            series: this.createSeries(),
            plotOptions: {
                line: {
                    animation: false,
                    allowPointSelect: true,
                    boostThreshold: 1,
                    lineWidth: 1,
                    marker: {
                        enabled: false,
                        symbol: 'circle',
                        states: {
                            hover: {
                                enabled: true
                            },
                            select: {
                                enabled: true
                            }
                        }
                    }
                }
            },
            xAxis: {
                title: {
                    text: null
                },
                labels: {
                    enabled: false
                },
                minorTickInterval: 'auto',
                tickWidth: 0
            },
            yAxis: {
                title: {
                    text: null
                },
                labels: {
                    enabled: false
                },
                minorTickInterval: 'auto',
                tickWidth: 0
            }
        };

        return (
            <Paper className="graph" elevation={1}>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={options}
                />
            </Paper>
        );
    }
}
