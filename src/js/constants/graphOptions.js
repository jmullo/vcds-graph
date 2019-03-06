export const DEFAULT_HEIGHT = 400;
export const MIN_HEIGHT = 200;

export const OPTIONS = {
    credits: {
        enabled: false
    },
    colors: [
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
    }
};
