import React from "react";
import { render } from "react-dom";

import Accordion from "./Accordion";

import "./styles.css";

function App() {
  return (
    <div className="app">
      <h1>Accordion Demo</h1>
      <h2>Default</h2>
      <Accordion>
        <div label="Alligator Mississippiensis">
          <p>
            <strong>Common Name:</strong> American Alligator
          </p>
          <p>
            <strong>Distribution:</strong> Texas to North Carolina, United
            States
          </p>
          <p>
            <strong>Endangered Status:</strong> Currently Not Endangered
          </p>
        </div>
        <div label="Alligator Sinensis">
          <p>
            <strong>Common Name:</strong> Chinese Alligator
          </p>
          <p>
            <strong>Distribution:</strong> Eastern China
          </p>
          <p>
            <strong>Endangered Status:</strong> Critically Endangered
          </p>
        </div>
      </Accordion>
      <h2>Allow Multiple Open + Open Section By Default</h2>
      <Accordion allowMultipleOpen>
        <div label="Alligator Mississippiensis" isOpen>
          <p>
            <strong>Common Name:</strong> American Alligator
          </p>
          <p>
            <strong>Distribution:</strong> Texas to North Carolina, United
            States
          </p>
          <p>
            <strong>Endangered Status:</strong> Currently Not Endangered
          </p>
        </div>
        <div label="Alligator Sinensis">
          <p>
            <strong>Common Name:</strong> Chinese Alligator
          </p>
          <p>
            <strong>Distribution:</strong> Eastern China
          </p>
          <p>
            <strong>Endangered Status:</strong> Critically Endangered
          </p>
        </div>
      </Accordion>
    </div>
  );
}

const container = document.createElement("div");
document.body.appendChild(container);
render(<App />, container);
