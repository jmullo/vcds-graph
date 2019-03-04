export const DEFAULT_HEIGHT = 400;

export const OPTIONS = {
    credits: {
        enabled: false
    },
    chart: {
        type: 'line',
        animation: false,
        height: DEFAULT_HEIGHT,
        spacing: [8, 4, 0, 4],
        panning: true,
        panKey: 'ctrl',
        zoomType: 'x'
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
    tooltip: {
        shared: true,
        hideDelay: 100
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
