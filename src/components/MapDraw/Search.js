import React from "react";
import { withLeaflet, Popup } from "react-leaflet";
import { ReactLeafletSearch } from "react-leaflet-search";

class SearchBox extends React.Component {
  render() {
    return <ReactLeafletSearch position="top" />;
  }
}

export default withLeaflet(SearchBox);
