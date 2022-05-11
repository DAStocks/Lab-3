var map = L.map('map').setView([47.28, -122.48], 12);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/256/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    accessToken: 'pk.eyJ1IjoiZGFzMjY0IiwiYSI6ImNremYwMWQ5cjNkMncyb254dWo2cmRoeHMifQ.pVEaOoZr0WG4A61Bs9f_eg',
}).addTo(map);

        L.Control.textbox = L.Control.extend({
        		onAdd:function(map) {

        		var text = L.DomUtil.create('div');
        		text.id = "info_text";
        		text.innerHTML = "<strong>Try clicking and moving the markers on your own. Click the map or drag markers.</strong>"
        		return text;
        		},
        		onRemove: function(map) {
        		}
        	});

	L.control.textbox = function(opts) { return new L.Control.textbox(opts);}
	L.control.textbox({ position: 'bottomleft',}).addTo(map);



var control = L.Routing.control({
          waypoints: [
              L.latLng(47.246587, -122.438830),
              L.latLng(47.258024, -122.444725),
              L.latLng(47.318017, -122.542970)
          ],
           routeWhileDragging: true,
           units:'imperial',
           collapsible: true,
           router: L.Routing.mapbox('pk.eyJ1IjoiZGFzMjY0IiwiYSI6ImNrdXl4NXpxYTc3Mmsyd3E2ZDZ6bm55b3cifQ.o7GVvvktEJvo_MAGbb8MCw'),
      }).addTo(map);


      function createButton(label, container) {
          var btn = L.DomUtil.create('button', '', container);
          btn.setAttribute('type', 'button');
          btn.innerHTML = label;
          return btn;
      }

      map.on('click', function(e) {
          var container = L.DomUtil.create('div'),
              startBtn = createButton('Start from this location', container),
              destBtn = createButton('Go to this location', container);

          L.popup()
              .setContent(container)
              .setLatLng(e.latlng)
              .openOn(map);

              L.DomEvent.on(startBtn, 'click', function() {
             control.spliceWaypoints(0, 1, e.latlng);
             map.closePopup();
           });

             L.DomEvent.on(destBtn, 'click', function() {
                 control.spliceWaypoints(control.getWaypoints().length - 1, 1, e.latlng);
                 control.show();
                 map.closePopup();
       });
       });
