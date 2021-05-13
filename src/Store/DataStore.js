import { makeAutoObservable } from "mobx";

class DataStore {
  masterDataObj = {};
  masterDataCountryOrder = [];

  indianStateObj = {};
  indianStateOrder = [];

  constructor() {
    makeAutoObservable(this);
  }

  generateRowData(countryData, covidData) {
    let masterObj = {};
    let masterCountryOrder = [];

    countryData.forEach((country, index) => {
      const CountryCode = `${country.alpha2Code}`.toUpperCase();
      if (masterObj[CountryCode]) {
        console.warn("verify data", country, "at index", index);
        return false;
      }
      masterCountryOrder.push(CountryCode);
      masterObj[CountryCode] = {
        Country: country.name,
        Capital: country.capital,
        region: country.region,
        population: country.population
      };
    });

    covidData.Countries.forEach((covid, index) => {
      const CountryCode = `${covid.CountryCode}`.toUpperCase();
      if (masterObj[CountryCode]) {
        masterObj[CountryCode].NewConfirmed = covid.NewConfirmed;
        masterObj[CountryCode].TotalConfirmed = covid.TotalConfirmed;
        masterObj[CountryCode].NewDeaths = covid.NewDeaths;
        masterObj[CountryCode].TotalDeaths = covid.TotalDeaths;
        masterObj[CountryCode].NewRecovered = covid.NewRecovered;
        masterObj[CountryCode].TotalRecovered = covid.TotalRecovered;
        masterObj[CountryCode].Date = covid.Date;
      } else {
        console.warn("verify covid data", covid, "at index", index);
      }
    });

    this.masterDataObj = masterObj;
    this.masterDataCountryOrder = masterCountryOrder;
    console.log(this.masterDataCountryOrder, "test");
  }

  generateIndiaInfectionData(data) {
    const indianStateOrderTemp = Object.keys(data).filter(
      (key) => key !== "TT"
    );
    console.log(indianStateOrderTemp);
    const indianStateObjTemp = {};
    indianStateOrderTemp.forEach((stateId, index) => {
      if (indianStateObjTemp[stateId]) {
        console.warn("repited data", stateId, index);
        return true;
      }
      const stateObj = {
        ...data[stateId].total,
        population: data[stateId]?.meta.population
      };
      indianStateObjTemp[stateId] = stateObj;
      indianStateObjTemp[stateId].deathPer = (
        (stateObj.deceased / stateObj.population) *
        100
      ).toFixed(4);
      indianStateObjTemp[stateId].recoverPer = (
        (stateObj.recovered / stateObj.population) *
        100
      ).toFixed(4);
      indianStateObjTemp[stateId].infectedPer = (
        (stateObj.confirmed / stateObj.population) *
        100
      ).toFixed(4);
    });
    this.indianStateOrder = indianStateOrderTemp;
    this.indianStateObj = indianStateObjTemp;
  }
}

export default new DataStore();
