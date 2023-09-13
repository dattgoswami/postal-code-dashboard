import React, { useState, useEffect } from "react";
import ReportTable from "./components/ReportTable";
import CitiesDropdown from "./components/CitiesDropdown";
import fetchData from "./api/fetchData";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Container, Typography } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#4FA072",
    },
    background: {
      default: "#FFFFFF",
      paper: "white",
    },
  },
});

function App() {
  const [allData, setAllData] = useState([]);
  const [displayData, setDisplayData] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);

  useEffect(() => {
    async function getAllData() {
      const reportData = await fetchData("/api/report");
      setAllData(reportData);
      setDisplayData(reportData);
      const citiesData = await fetchData("/api/cities");
      setCities(citiesData);
    }
    getAllData();
  }, []);

  useEffect(() => setDisplayData(allData), [allData]);

  return (
    <ThemeProvider theme={theme}>
      <Container className="container">
        <div>
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{
              color: theme.palette.primary.main,
              backgroundColor: "#2c2c2c",
              padding: "1rem 0",
              borderRadius: "8px",
            }}
          >
            Postal Code Performance Analysis
          </Typography>
          <CitiesDropdown
            cities={cities}
            selectedCities={selectedCities}
            setSelectedCities={setSelectedCities}
          />
          <ReportTable data={displayData} selectedCities={selectedCities} />
        </div>
      </Container>
    </ThemeProvider>
  );
}

export default App;
