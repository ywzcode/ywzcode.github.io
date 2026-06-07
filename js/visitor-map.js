(function () {
  var mapDetails = document.querySelector('.visitor-map-toggle');
  var mapWidget = document.getElementById('visitor-map-widget');

  if (!mapDetails || !mapWidget) {
    return;
  }

  function escapeAttribute(value) {
    return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
  }

  function loadVisitorMap() {
    if (mapWidget.dataset.loaded === 'true') {
      return;
    }

    var iframe = document.createElement('iframe');
    var revolverSrc = mapWidget.dataset.revolverSrc;

    iframe.className = 'visitor-map-frame';
    iframe.title = 'Interactive visitor map';
    iframe.loading = 'lazy';
    iframe.referrerPolicy = 'no-referrer-when-downgrade';
    iframe.sandbox = 'allow-scripts allow-popups allow-popups-to-escape-sandbox';
    iframe.srcdoc = [
      '<!doctype html>',
      '<html lang="en">',
      '<head>',
      '<meta charset="utf-8">',
      '<meta name="viewport" content="width=device-width, initial-scale=1">',
      '<style>html,body{align-items:center;background:#fff;display:flex;height:100%;justify-content:center;margin:0;overflow:hidden;width:100%;}</style>',
      '</head>',
      '<body>',
      '<script src="',
      escapeAttribute(revolverSrc),
      '"><\/script>',
      '</body>',
      '</html>'
    ].join('');

    iframe.onload = function () {
      var loadingMessage = mapWidget.querySelector('.visitor-map-loading');
      if (loadingMessage) {
        loadingMessage.remove();
      }
    };

    mapWidget.dataset.loaded = 'true';
    mapWidget.appendChild(iframe);
  }

  mapDetails.addEventListener('toggle', function () {
    if (mapDetails.open) {
      loadVisitorMap();
    }
  });
})();
