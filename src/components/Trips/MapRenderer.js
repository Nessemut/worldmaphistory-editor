import React from "react";
import { Map, TileLayer, Marker, LayersControl } from "react-leaflet";
import { GoogleLayer } from "react-leaflet-google";
import Leaflet from "leaflet";
import CustomPolyline from "./CustomPolyline";
import MapPath from "./MapPath";
const { BaseLayer } = LayersControl;
const key = "AIzaSyCpRT2Fboqg_A0j-1cb4H5tJBEwmwtgLUA";
const terrain = "TERRAIN";
const road = "ROADMAP";
const satellite = "SATELLITE";
const hybrid = "HYBRID";
class MapRenderer extends React.Component {
  render() {
    return (
      <Map
        center={this.props.center}
        zoom={this.props.zoom}
        trips={this.props.trips}
      >
        <LayersControl position="topright">
          <BaseLayer checked name="OpenStreetMap.Mapnik">
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </BaseLayer>
          <BaseLayer name="OpenStreetMap.BlackAndWhite">
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png"
            />
          </BaseLayer>
          <BaseLayer name="Google Maps Roads">
            <GoogleLayer googlekey={key} maptype={road} />
          </BaseLayer>
          <BaseLayer name="Google Maps Terrain">
            <GoogleLayer googlekey={key} maptype={terrain} />
          </BaseLayer>
          <BaseLayer name="Google Maps Satellite">
            <GoogleLayer googlekey={key} maptype={satellite} />
          </BaseLayer>
          <BaseLayer name="Google Maps Hybrid">
            <GoogleLayer googlekey={key} maptype={hybrid} />
          </BaseLayer>
        </LayersControl>
        {this.props.histories.map((history, index) => (
          <React.Fragment>
            <MapPath
              data={history}
              key={index}
              parentKey={index}
              v_no={this.props.selectedVehicleNo}
              color={this.props.trips[index].cardColor}
            />
            <CustomPolyline
              points={history}
              v_no={this.props.selectedVehicleNo}
              color={this.props.trips[index].cardColor}
            />
          </React.Fragment>
        ))}
        {this.props.trips.map(item => (
          <React.Fragment>
            <Marker
              position={{
                lat: item.consigner_lat,
                lng: item.consigner_long
              }}
              icon={
                new Leaflet.Icon({
                  iconUrl:
                    "https://uploads.codesandbox.io/uploads/user/586ce611-905b-4f79-9d4f-75b900843368/5Tfg-map-marker-variant-tool.svg",
                  iconSize: [35, 45]
                })
              }
            />
            <Marker
              position={{
                lat: item.consignee_lat,
                lng: item.consignee_long
              }}
              icon={
                new Leaflet.Icon({
                  iconUrl:
                    "https://uploads.codesandbox.io/uploads/user/586ce611-905b-4f79-9d4f-75b900843368/PG55-gps.svg",
                  iconSize: [28, 36]
                })
              }
            />
          </React.Fragment>
        ))}
      </Map>
    );
  }
}
export default MapRenderer;
