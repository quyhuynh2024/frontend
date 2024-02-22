import React from "react";
import Button from "./components/Button";
import Input from "./components/Input";

function App() {
  return (
    <div>
      App
      <Button data-ripple="#0990ff" variant="outlined">
        App
      </Button>
      <Button data-ripple="#ffffff">App</Button>
      <br />
      <Input placeholder="Email" />
      <br />
      <Input placeholder="Password" />
    </div>
  );
}

export default App;
