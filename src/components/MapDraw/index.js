import React from "react";
import {
  Map,
  TileLayer,
  FeatureGroup,
  MapControl,
  withLeaflet
} from "react-leaflet";
//import CircleMaker from "./CircleMaker";
import { EditControl } from "react-leaflet-draw";
import "leaflet-geosearch/assets/css/leaflet.css";
//import Search from "./Search";

import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";

class AddressControl extends MapControl {
  constructor(props, context) {
    super(props);
  }

  attachEvents() {
    this.leafletElement.onSubmit = e => {
      this.props.submit(e);
    };
  }

  createLeafletElement() {
    const provider = new OpenStreetMapProvider();
    return GeoSearchControl({
      provider: provider,
      autoClose: true,
      showMarker: true,
      retainZoomLevel: true
    });
  }

  componentDidMount() {
    const { map } = this.props.leaflet;
    map.addControl(this.leafletElement);
    this.attachEvents();
  }
}
var obj;

class MapDraw extends React.Component {
  state = {
    zoom: 4,
    metric: null,
    lat: 28.77,
    lng: 77,
    radius: 0,
    visible: false,
    type: null,
    created: false
  };
  _onDrawStop = r => {
    //console.log(r);
    r.radius = r.layerType === "circle" ? this.state.radius : null;
  };
  _onEditPath = r => {
    {
      //console.log(r);
      this.state.type === "circle" &&
        this.setState({
          radius:
            this.state.metric === "m"
              ? obj.layer.getRadius()
              : obj.layer.getRadius() / 1000
        });
    }
  };
  _onCreate = result => {
    // console.log(result);
    obj = result;
    this.setState({
      // lat: result.layer._latlng.lat,
      // lng: result.layer._latlng.lng,
      radius: result.layer._mRadius / 1000,
      first: this.state.first === null ? result.layerType : this.state.first,
      visible: true,
      type: result.layerType,
      created: true
    });
  };
  _onDeleted = () => {
    // const { type } = this.state;
    // this.setState({ [`visible${type}`]: true });

    this.setState({
      metric: null,
      radius: 0,
      visible: false,
      type: null,
      created: false
    });
    window.location.reload();
  };

  changeRadius = e => {
    this.setState({ radius: e.target.value }, () => {
      obj.layer.setRadius(
        this.state.metric === "m" ? this.state.radius : this.state.radius * 1000
      );
    });
  };
  addShape = () => {};
  // clearShape = () => {
  //   () => this._onDeleted;
  // };
  changeMetric = e => {
    this.setState(
      {
        metric: e.target.value
      },
      () => {
        obj.layer.setRadius(
          this.state.metric === "m"
            ? this.state.radius
            : this.state.radius * 1000
        );
      }
    );
  };
  render() {
    //const position = [this.state.lat, this.state.lng];
    const AddressSearch = withLeaflet(AddressControl);
    const center = [28, 77];
    return (
      <React.Fragment>
        <center>
          <div style={{ position: "relative" }}>
            POI nickname : <input type="text" /> POI type :{" "}
            <select>
              <option>Select POI Type</option>
              <option>B</option>
            </select>{" "}
            {this.state.visible && this.state.type === "circle" && (
              <React.Fragment>
                Radius :{" "}
                <select onChange={this.changeMetric}>
                  <option>km</option>
                  <option>m</option>
                </select>{" "}
                <input
                  id="radius"
                  type="number"
                  value={this.state.radius}
                  step="10"
                  onChange={this.changeRadius}
                />
              </React.Fragment>
            )}
            {this.state.created && (
              <React.Fragment>
                {" "}
                <button onClick={() => this.addShape()}>Add</button>{" "}
                <button onClick={this._onDeleted}>Clear</button>
              </React.Fragment>
            )}
          </div>
        </center>
        <div
          style={{
            height: "600px",
            width: "100%",
            zIndex: "-1",
            top: 0,
            left: 0,
            position: "absolute"
          }}
        >
          <Map
            center={center}
            zoom={this.state.zoom}
            // addControl={searchControl}
            ref="map"
          >
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <AddressSearch submit={x => console.log(x)} />
            {/* <Search /> */}
            <FeatureGroup>
              <EditControl
                position="topright"
                onEdited={this._onEditPath}
                onCreated={this._onCreate}
                onDeleted={this._onDeleted}
                onDrawStop={this._onDrawStop}
                draw={{
                  rectangle: false,
                  circlemarker: false,
                  circle: !this.state.visible,
                  polygon: !this.state.visible,
                  marker: false,
                  polyline: false
                }}
              />
              {/* <Circle
                center={{
                  lat: this.state.lat,
                  lng: this.state.lng
                }}
                radius={this.state.radius}
              /> */}
              )
            </FeatureGroup>
          </Map>
        </div>
      </React.Fragment>
    );
  }
}
export default MapDraw;
