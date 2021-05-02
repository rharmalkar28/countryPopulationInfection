import React, { useEffect } from "react";
import {
  Paper,
  TableContainer,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell
} from "@material-ui/core";
import { getService } from "../../Services/ApiServices";
import { observer } from "mobx-react-lite";

const CountryInfected = observer(({ dataStore }) => {
  console.log(dataStore, "test");
  async function apiCall() {
    const responce = await Promise.all([
      getService("https://restcountries.eu/rest/v2/all"),
      getService("https://api.covid19api.com/summary")
    ]);
    console.log("exe");
    dataStore.generateRowData(responce[0].data, responce[1].data);
  }
  useEffect(() => {
    apiCall();
  }, []);
  return (
    <TableContainer component={Paper}>
      <Table aria-label="table">
        <TableHead>
          <TableRow>
            <TableCell>Country (Capital)</TableCell>
            <TableCell align="right">Populaion</TableCell>
            <TableCell align="right">Covid Confirmed</TableCell>
            <TableCell align="right">Covid Recovered</TableCell>
            <TableCell align="right">Covid Death</TableCell>
            <TableCell align="right">% of population infected</TableCell>
            <TableCell align="right">% of population recoverd</TableCell>
            <TableCell align="right">% of population death</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataStore.masterDataCountryOrder.map((row) => (
            <TableRow key={row}>
              <TableCell component="th" scope="row">
                {dataStore.masterDataObj[row].Country}
              </TableCell>
              <TableCell align="right">
                {dataStore.masterDataObj[row].population}
              </TableCell>
              <TableCell align="right">
                {dataStore.masterDataObj[row].TotalConfirmed || "-"}
              </TableCell>
              <TableCell align="right">
                {dataStore.masterDataObj[row].TotalRecovered || "-"}
              </TableCell>
              <TableCell align="right">
                {dataStore.masterDataObj[row].TotalDeaths || "-"}
              </TableCell>
              <TableCell align="right">
                {(dataStore.masterDataObj[row].TotalConfirmed /
                  dataStore.masterDataObj[row].population) *
                  100}
              </TableCell>
              <TableCell align="right">
                {(dataStore.masterDataObj[row].TotalRecovered /
                  dataStore.masterDataObj[row].population) *
                  100}
              </TableCell>
              <TableCell align="right">
                {(dataStore.masterDataObj[row].TotalDeaths /
                  dataStore.masterDataObj[row].population) *
                  100}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
});

export default CountryInfected;
