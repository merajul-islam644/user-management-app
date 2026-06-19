import React from "react";
import Draggable from "react-draggable";

export default function App() {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f0f0f0",
      }}
    >
      <Draggable>
        <div
          style={{
            width: 200,
            padding: 20,
            background: "#3498db",
            color: "white",
            cursor: "move",
            borderRadius: 10,
            textAlign: "center",
            fontSize: 20,
            userSelect: "none",
          }}
        >
          Drag Me
        </div>
      </Draggable>
    </div>
  );
}
