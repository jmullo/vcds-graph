export const DEFAULT_HEIGHT = 450;
export const MIN_HEIGHT = 125;

export const OPTIONS = {
    credits: {
        enabled: false
    },
    _colors: [
        '#4363d8',
        '#e6194B',
        '#3cb44b',
        '#ffe119',
        '#f58231',
        '#911eb4',
        '#42d4f4',
        '#f032e6',
        '#bfef45',
        '#fabebe',
        '#469990',
        '#9A6324',
        '#800000',
        '#000075',
        '#aaffc3'
    ],
    chart: {
        type: 'line',
        animation: false,
        height: DEFAULT_HEIGHT,
        spacing: [8, 4, 8, 4],
        panning: true,
        panKey: 'ctrl',
        zoomType: 'x',
        style: {
            fontFamily: '"Roboto", sans-serif'
        }
    },
    title: {
        text: null
    },
    subtitle: {
        text: null
    },
    series: null,
    plotOptions: {
        line: {
            animation: false,
            allowPointSelect: true,
            lineWidth: 1.2,
            marker: {
                enabled: false,
                symbol: 'circle',
                states: {
                    hover: {
                        enabled: true,
                        lineWidthPlus: 0.6
                    }
                }
            }
        }
    },
    legend: {
        itemStyle: {
            color: '#333333',
            cursor: 'pointer',
            fontSize: '12px',
            fontWeight: 500,
            textOverflow: 'ellipsis'
        }
    },
    tooltip: {
        shared: true,
        hideDelay: 100,
        headerFormat: '<span style="font-size: 10px">Time: {point.key}</span><br/>',
        pointFormat: '<span style="color:{point.color}">\u25CF</span> {series.name}: <span style="font-weight:700">{point.y}</span><br/>'
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
    },
    exporting: {
        sourceWidth: 1200,
        sourceHeight: 500,
        scale: 1.5
    }
};
