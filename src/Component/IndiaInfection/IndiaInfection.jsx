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
import { IndianStateNames } from "../../Constant/constant";

const IndiaInfection = observer(({ dataStore }) => {
  console.log(dataStore, "test");
  const [isLoading, setIsLoader] = useState(true);
  async function getIndiaInfection() {
    const responce = await Promise.all([
      getService("https://api.covid19india.org/v4/min/data.min.json")
    ]);
    console.log("exe");
    dataStore.generateIndiaInfectionData(responce[0].data);
    setIsLoader(false);
  }
  useEffect(() => {
    getIndiaInfection();
  }, []);

  if (isLoading) {
    return <LinearProgress />;
  }

  return (
    <div style={{ marginBottom: "100px" }}>
      <h6>Data as on {dataStore.indianDataDated}</h6>
      <TableContainer component={Paper} style={{ maxHeight: "500px" }}>
        <Table stickyHeader aria-label="table">
          <TableHead>
            <TableRow>
              <TableCell>State/ UT</TableCell>
              <TableCell align="right">Populaion</TableCell>
              <TableCell align="right">Tested</TableCell>
              <TableCell align="right">vaccinated</TableCell>
              <TableCell align="right">Covid Confirmed</TableCell>
              <TableCell align="right">Covid Recovered</TableCell>
              <TableCell align="right">Covid Death</TableCell>
              <TableCell align="right">% of population infected</TableCell>
              <TableCell align="right">% of population recoverd</TableCell>
              <TableCell align="right">% of population death</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataStore.indianStateOrder.map((row) => (
              <TableRow key={row}>
                <TableCell component="th" scope="row">
                  {`${IndianStateNames[row].name} (${row})`}
                </TableCell>
                <TableCell align="right">
                  {dataStore.indianStateObj[row].population}
                </TableCell>
                <TableCell align="right">
                  {dataStore.indianStateObj[row].tested}
                </TableCell>
                <TableCell align="right">
                  {dataStore.indianStateObj[row].vaccinated}
                </TableCell>
                <TableCell align="right">
                  {dataStore.indianStateObj[row].confirmed || "-"}
                </TableCell>
                <TableCell align="right">
                  {dataStore.indianStateObj[row].recovered || "-"}
                </TableCell>
                <TableCell align="right">
                  {dataStore.indianStateObj[row].deceased || "-"}
                </TableCell>
                <TableCell align="right">
                  {dataStore.indianStateObj[row].infectedPer + " %"}
                </TableCell>
                <TableCell align="right">
                  {dataStore.indianStateObj[row].recoverPer + " %"}
                </TableCell>
                <TableCell align="right">
                  {dataStore.indianStateObj[row].deathPer + " %"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
});

export default IndiaInfection;
