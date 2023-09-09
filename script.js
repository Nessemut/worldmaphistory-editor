let config = {
    minZoom: 0,
    maxZoom: 18,
    zoomControl: false, // zoom control off
};
const zoom = 8;

const lat = 52.22977;
const lng = 21.01178;

const map = L.map("map", config).setView([lat, lng], zoom);

let coordinates = []

// Used to load and display tile layers on the map
// Most tile servers require attribution, which you can set under `Layer`
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

L.control.zoom({position: "topright"}).addTo(map);

const options = {
    position: "topleft", // toolbar position, options are 'topleft', 'topright', 'bottomleft', 'bottomright'
    drawMarker: false, // adds button to draw markers
    drawPolygon: true, // adds button to draw a polygon
    drawPolyline: true, // adds button to draw a polyline
    drawCircle: false, // adds button to draw a circle
    editPolygon: true, // adds button to toggle global edit mode
    deleteLayer: true, // adds a button to delete layers
};

// add leaflet.pm controls to the map
map.pm.addControls(options);

// get array of all available shapes
map.pm.Draw.getShapes();

// listen to when drawing mode gets enabled
map.on("pm:drawstart", function (e) {
    console.log(e);
});

// listen to when drawing mode gets disabled
map.on("pm:drawend", function (e) {
    console.log(e);
});

// listen to when a new layer is created
map.on("pm:create", function (e) {
    coordinates = e.layer._latlngs;

    // Listen to changes on the new layer
    e.layer.on("pm:edit", function (x) {
        console.log("edit", x);
    });
});

function submit() {

    let data = {
        name: document.getElementsByName("name").item(0).value,
        coordinates: coordinates
    };

    fetch("http://localhost:8080/border", {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    }).then(res => {
        console.log("Request complete! response:", res);
    }).catch(error => console.log(error));

}