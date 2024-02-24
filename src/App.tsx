import api from "./apis/configs/axiosConfig";
import Button from "./components/Button";

function App() {
  
  return (
    <div>
      <Button
        variant="outlined"
        data-ripple="#0990ff"
        onClick={async () => {
          try {
            const res = await api.get("/");
            console.log(res);
          } catch (error) {
            console.log(error);
          }
        }}
      >
        Get /
      </Button>
    </div>
  );
}

export default App;
