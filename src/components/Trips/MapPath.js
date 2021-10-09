import React from "react";
import { CircleMarker, Marker, Popup } from "react-leaflet";
import Leaflet from "leaflet";
class MapPath extends React.Component {
  render() {
    // const markerHtmlStyles = `
    //   background-color: ${this.props.color};
    //   width: 0.5em;
    //   height: 0.5em;
    //   display:block;
    //   position: relative;
    //   border-radius: 50%;
    //   transform: rotate(90deg);
    //   border: 1px solid #FFFFFF;
    //   `;
    // const image = new Leaflet.divIcon({
    //   html: `<span style="${markerHtmlStyles}" />`,
    //   iconSize: [9, 10]
    // });

    if (this.props.v_no == null) {
      return (
        <React.Fragment>
          {this.props.data.map((val, ind) => (
            <React.Fragment>
              <CircleMarker
                center={{
                  lat: Number(val.latitude),
                  lng: Number(val.longitude)
                }}
                key={`marker_${this.props.parentKey}_${ind}`}
                color={this.props.color}
                radius="3"
              >
                <Popup>
                  <h2>Tracking Details</h2>
                  <b> Landmark : </b>
                  {val.landmark}
                  <br />
                  <b> Speed : </b>
                  {val.speed} km/hr
                  <br />
                  <b>Vehicle Status : </b>
                  {val.state}
                  <br />
                  <b>Last Updated : </b>
                  {val.updatedat}
                </Popup>
              </CircleMarker>
            </React.Fragment>
          ))}
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          {this.props.data.map((val, ind) => (
            <CircleMarker
              center={{
                lat:
                  val.vehicle_no === this.props.v_no
                    ? Number(val.latitude)
                    : null,
                lng:
                  val.vehicle_no === this.props.v_no
                    ? Number(val.longitude)
                    : null
              }}
              key={`marker_${this.props.parentKey}_${ind}`}
              color={this.props.color}
              radius="2"
            >
              <Popup>
                <h2>Tracking Details</h2>
                <b> Landmark : </b>
                {val.landmark}
                <br />
                <b> Speed : </b>
                {val.speed} km/hr
                <br />
                <b>Vehicle Status : </b>
                {val.state}
                <br />
                <b>Last Updated : </b>
                {val.updatedat}
              </Popup>
            </CircleMarker>
          ))}
        </React.Fragment>
      );
    }
  }
}

export default MapPath;
