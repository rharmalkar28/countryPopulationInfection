import "./styles.css";
import CountryInfected from "./Component/CountryPopulationInfected/CountryInfected";
import IndiaInfection from "./Component/IndiaInfection/IndiaInfection";
import DataStore from "./Store/DataStore";

export default function App() {
  return (
    <div className="App">
      <h1>Harmalkar Rahul Analyses</h1>
      <CountryInfected dataStore={DataStore} />
      <h2>Indian States and UTs</h2>
      <IndiaInfection dataStore={DataStore} />
    </div>
  );
}
