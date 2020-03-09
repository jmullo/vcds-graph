export const DEFAULT_HEIGHT = 450;
export const MIN_HEIGHT = 125;

export const GLOBAL_OPTIONS = {
    lang: {
        numericSymbols: null
    }
};

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
            allowPointSelect: false,
            lineWidth: 1.2,
            findNearestPointBy: 'x',
            turboThreshold: 5000,
            states: {
                hover: {
                    enabled: true,
                    lineWidthPlus: 0,
                    halo: {
                        size: 8
                    }
                },
                inactive: {
                    enabled: false,
                    opacity: 0.1
                }
            },
            marker: {
                enabled: false,
                symbol: 'circle',
                radius: 2,
                states: {
                    hover: {
                        enabled: true,
                        radiusPlus: 1
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
        split: false,
        hideDelay: 100,
        distance: 60,
        headerFormat: '',
        pointFormat: '<span style="color:{point.color}">\u25CF</span> {series.name}: <span style="font-weight:700">{point.y}</span><br/>'
    },
    xAxis: {
        title: {
            text: null
        },
        labels: {
            enabled: true
        },
        crosshair: true,
        min: 0,
        minorTickInterval: null,
        tickWidth: 0.7,
        tickLength: 6
    },
    yAxis: {
        title: {
            text: null
        },
        labels: {
            enabled: false
        },
        showFirstLabel: false,
        showLastLabel: true,
        minorTickInterval: null,
        tickWidth: 0
    },
    exporting: {
        sourceWidth: 1200,
        sourceHeight: 500,
        scale: 1.5
    }
};
