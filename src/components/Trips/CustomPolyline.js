import React from "react";
import { Polyline } from "react-leaflet";
class CustomPolyline extends React.Component {
  state = {
    position: this.props.points.map(item => ({
      lat: Number(item.latitude),
      lng: Number(item.longitude)
    }))
  };
  render() {
    if (this.props.v_no == null) {
      return (
        <Polyline positions={this.state.position} color={this.props.color} />
      );
    } else {
      const location = this.props.points.map(val => ({
        lat: val.vehicle_no === this.props.v_no ? Number(val.latitude) : null,
        lng: val.vehicle_no === this.props.v_no ? Number(val.longitude) : null
      }));
      return <Polyline positions={location} color={this.props.color} />;
    }
  }
}
export default CustomPolyline;
