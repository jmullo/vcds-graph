import { includes, sortBy } from 'lodash';
import Highcharts from 'highcharts';

export default () => {

    Highcharts.wrap(Highcharts.Tooltip.prototype, 'refresh', function (proceed, points) {
        const point = points[0];
        const chart = point.series.chart;
    
        chart.series.forEach((series) => {
            if (series !== point.series && series.visible) {
                const closestPoint = series.points.sort(
                    (pointA, pointB) => Math.abs(point.x - pointA.x) - Math.abs(point.x - pointB.x)
                )[0];

                if (!includes(points, closestPoint)) {
                    points.push(closestPoint);
                }
            }
        });

        const args = [].slice.call(arguments, 1);

        args[0] = sortBy(points, ['colorIndex']);

        proceed.apply(this, args);
    });

};
