export default (tooltip) => {
    return tooltip.chart.series.reduce((result, series) => {
        return result + '<br/>' + point.series.name + ': ' + point.y + 'm';
    }, '<b>' + '</b>');
};
