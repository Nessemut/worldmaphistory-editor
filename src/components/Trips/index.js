import React from "react";
import ColorHash from "color-hash";
import MapRenderer from "./MapRenderer";
//const mapRef = React.createRef();
class Trips extends React.Component {
  state = {
    zoom: 5,
    center: [20, 77],
    selectedVehicleNo: null,
    histories: this.props.histories,
    trips: this.props.trips.map(item => ({
      cardColor: new ColorHash().hex(item.id),
      consignee_name: item.consignee_name,
      consigner_name: item.consigner_name,
      consignment_id: item.id,
      consigner_lat: item.consigner_lat,
      consigner_long: item.consigner_long,
      consignee_lat: item.consignee_lat,
      consignee_long: item.consignee_long,
      vehicle_no: item.vehicle_no,
      origin: item.origin,
      destination: item.destination,
      lorry_receipt_no: item.lorry_receipt_no,
      state: item.state,
      loading_in_time: item.loading_in_time,
      loading_out_time: item.loading_out_time,
      unloading_in_time: item.unloading_in_time,
      unloading_out_time: item.unloading_out_time,
      leg_no: item.leg_no,
      selectedTripIndex: null
    }))
  };
  render() {
    var id = 2;
    return (
      <React.Fragment>
        <div className="flex-container">
          <div className="card-container">
            <center>
              <button
                className="showall"
                onClick={() =>
                  this.setState({
                    selectedVehicleNo: null,
                    selectedTripIndex: null,
                    zoom: 5,
                    center: [20, 77]
                  })
                }
              >
                <b>Show All Trips</b>
              </button>
            </center>
            <br />

            {this.state.trips.map((item, index) => (
              <React.Fragment>
                <div>
                  <b>Consignment-No:</b>
                  <div
                    className="card"
                    style={{
                      border: "0.5px solid black",
                      borderLeftColor: item.cardColor,
                      borderLeftWidth: "7px",
                      boxShadow:
                        index === this.state.selectedTripIndex
                          ? "5px 6px #F0E68C"
                          : null
                    }}
                    onClick={() =>
                      this.setState({
                        selectedVehicleNo: item.vehicle_no,
                        selectedTripIndex: index,
                        center: [item.consigner_lat, item.consigner_long],
                        zoom: 9
                      })
                    }
                  >
                    <b>Vehicle No : </b>
                    {item.vehicle_no}
                    <br />
                    <b>Origin : </b>
                    {item.origin}
                    <br />
                    <b>Destination : </b>
                    {item.destination}
                    <br />
                    <b> Lorry receipt-no : </b>
                    {item.lorry_receipt_no}
                    <br />
                    <b>State : </b>
                    {item.state}
                    <br />
                    <b>Loading In Time: </b>
                    {item.loading_in_time}
                    <br />
                    <b>Loading Out Time: </b>
                    {item.loading_out_time}
                    <br />
                    <b>Unloading In Time: </b>
                    {item.unloading_in_time}
                    <br />
                    <b>Unloading Out Time: </b>
                    {item.unloading_out_time}
                    <br />
                    <b>Leg No: </b>
                    {item.leg_no}
                    <br />
                    <center>
                      <a href="#" title="See this trip" target="_blank">
                        See the Trip
                      </a>
                    </center>
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
          <div className="map" key={id++}>
            <MapRenderer
              center={this.state.center}
              zoom={this.state.zoom}
              key={id++}
              trips={this.state.trips}
              histories={this.state.histories}
              selectedVehicleNo={this.state.selectedVehicleNo}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Trips;
