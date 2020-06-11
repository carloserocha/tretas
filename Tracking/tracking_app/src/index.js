import React from "react";
import ReactDOM from "react-dom";
import { Container } from "semantic-ui-react";

import TrackingTable from "./TrackingTable";

const App = ({ children }) => (
  <Container style={{ margin: 20 }}>
    {children}
  </Container>
);

const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

ReactDOM.render(
  <App>
    <TrackingTable />
  </App>,
  document.getElementById("root")
);
