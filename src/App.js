import "./styles.css";
import CountryInfected from "./Component/CountryPopulationInfected/CountryInfected";
import DataStore from "./Store/DataStore";

export default function App() {
  return (
    <div className="App">
      <h1>Harmalkar Rahul Analyses</h1>
      <CountryInfected dataStore={DataStore} />
    </div>
  );
}
