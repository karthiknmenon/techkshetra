/* global Path, Point, view */

(function () {
    'use strict';

    var path = new Path({
        strokeColor: 'rgba(255, 255, 255, 0.1)',
        strokeWidth: 1,
        strokeCap: 'square'
    });

    var path2 = new Path({
        strokeColor: 'rgba(255, 255, 255, 0.2)',
        strokeWidth: 1,
        strokeCap: 'square'
    });

    function initializePath(path, numPoints, startPoint, endPoint, bottomOffset) {
        path.removeSegments();

        if (startPoint) {
            path.add(startPoint);
        }

        for (var i = 0; i < numPoints; ++i) {
            if (bottomOffset) {
                path.add(new Point(view.size.width / (numPoints - 1) * i, bottomOffset));
            } else {
                path.add(new Point(i / 3, 1) * view.size);
            }
        }

        if (endPoint) {
            path.add(endPoint);
        }
    }

    view.onResize = function() {
        initializePath(path, 4);
        initializePath(path2, 4);
    };

    view.onFrame = function(event) {
        var i, sinus;

        for (i = 0; i < 4; ++i) {
            sinus = Math.sin(event.time + i);

            path.segments[i].point.y = sinus * 100 + 500;
        }

        for (i = 0; i < 4; ++i) {
            sinus = Math.sin(event.time * -1 + i);

            path2.segments[i].point.y = -0.6 * sinus * 200 + 500;
        }

        path.smooth();
        path2.smooth();
    };
})();
