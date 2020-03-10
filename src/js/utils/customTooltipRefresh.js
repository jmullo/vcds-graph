import { includes, sortBy } from 'lodash';
import Highcharts from 'highcharts';

const slicePoints = (index, series, seriesLength) => {
    const adjustedIndex = series.points[0].index === 0 ? index : index - series.points[0].index;

    if (Math.abs(series.xData.length - seriesLength) < 2) {
        return series.points.slice(Math.max(0, adjustedIndex - 2), adjustedIndex + 3);
    }

    return series.points;
};

export default () => {

    Highcharts.wrap(Highcharts.Tooltip.prototype, 'refresh', function (proceed, points) {
        const point = points[0];
        const chart = point.series.chart;
        const seriesLength = point.series.xData.length;
    
        chart.series.forEach((series) => {
            if (series !== point.series && series.visible) {
                const closestPoint = slicePoints(point.index, series, seriesLength).sort(
                    (pointA, pointB) => Math.abs(point.x - pointA.x) - Math.abs(point.x - pointB.x)
                )[0];

                if (!includes(points, closestPoint)) {
                    points.push(closestPoint);
                }
            }
        });

        const args = [].slice.call(arguments, 1);

        args[0] = sortBy(points, ['series.name']);

        proceed.apply(this, args);
    });

};
