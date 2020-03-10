/* global Path, Point, view */
(function () {
    'use strict';

    var path = new Path({
        strokeColor: '#ffffff',
        strokeWidth: 1,
        strokeCap: 'square',
        fillColor: '#ffffff'
    });

    var path2 = new Path({
        strokeColor: 'rgba(255, 255, 255, 0.1)',
        strokeWidth: 1,
        strokeCap: 'square'
    });

    var path3 = new Path({
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
        initializePath(path, 5, view.bounds.bottomLeft, view.bounds.bottomRight, view.size.height - 10);
        initializePath(path2, 4);
        initializePath(path3, 4);
    };

    view.onFrame = function(event) {
        if (event.count > 0 && /Android/i.test(navigator.userAgent || navigator.vendor || window.opera)) {
            view.pause();

            return;
        }

        var i, sinus;

        for (i = 1; i < 6; ++i) {
            sinus = Math.sin(event.time * 0.4 + i);

            path.segments[i].point.y = sinus * 100 + 500;
        }

        for (i = 0; i < 4; ++i) {
            sinus = Math.sin(event.time + i);

            path2.segments[i].point.y = sinus * 100 + 500;
        }

        for (i = 0; i < 4; ++i) {
            sinus = Math.sin(event.time * -1 + i);

            path3.segments[i].point.y = -0.6 * sinus * 200 + 500;
        }

        path.smooth();
        path2.smooth();
        path3.smooth();
    };
})();
