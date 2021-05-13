import React, { useEffect, useState } from "react";
import {
  Paper,
  TableContainer,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  LinearProgress
} from "@material-ui/core";
import { getService } from "../../Services/ApiServices";
import { observer } from "mobx-react-lite";

const CountryInfected = observer(({ dataStore }) => {
  const [isLoading, setIsLoader] = useState(true);

  async function getCountryInfection() {
    const responce = await Promise.all([
      getService("https://restcountries.eu/rest/v2/all"),
      getService("https://api.covid19api.com/summary")
    ]);
    dataStore.generateRowData(responce[0].data, responce[1].data);
    setIsLoader(false);
  }
  useEffect(() => {
    getCountryInfection();
  }, []);

  if (isLoading) {
    return <LinearProgress />;
  }
  return (
    <div>
      <h6>Data as on {dataStore.globalDataDated}</h6>
      <TableContainer component={Paper} style={{ maxHeight: "500px" }}>
        <Table stickyHeader aria-label="table">
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
                  {`${dataStore.masterDataObj[row].Country} (${dataStore.masterDataObj[row].Capital})`}
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
                  {dataStore.masterDataObj[row].TotalConfirmed
                    ? (
                        (dataStore.masterDataObj[row].TotalConfirmed /
                          dataStore.masterDataObj[row].population) *
                        100
                      ).toFixed(4) + " %"
                    : "-"}
                </TableCell>
                <TableCell align="right">
                  {dataStore.masterDataObj[row].TotalRecovered
                    ? (
                        (dataStore.masterDataObj[row].TotalRecovered /
                          dataStore.masterDataObj[row].population) *
                        100
                      ).toFixed(4) + " %"
                    : "-"}
                </TableCell>
                <TableCell align="right">
                  {dataStore.masterDataObj[row].TotalDeaths
                    ? (
                        (dataStore.masterDataObj[row].TotalDeaths /
                          dataStore.masterDataObj[row].population) *
                        100
                      ).toFixed(4) + " %"
                    : "-"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
});

export default CountryInfected;
