import "./App.css";
import TextAreaPlaceHolders from "./components/TextAreaPlaceHolders";

const defaultProps = {
  text: `Hi 
            <div class="place-holder-container"><div><div class="place-holder" contenteditable="false">Provider Name</div></div><div><div class="place-holder-x" contenteditable="false"> x </div></div></div> 
            <br> How are you`,
  placeHolders: ["Talent Email", "Provider Name"],
};

function App() {
  return (
    <div className="App">
      <TextAreaPlaceHolders {...defaultProps} />
    </div>
  );
}

export default App;
