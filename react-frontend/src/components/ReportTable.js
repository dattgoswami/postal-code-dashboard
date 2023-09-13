import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import "./ReportTable.css";

const columns = [
  {
    field: "postalCodeFSA",
    headerName: "Postal Code FSA",
    flex: 1,
    headerClassName: "headerStyle",
  },
  {
    field: "city",
    headerName: "City",
    flex: 1,
    headerClassName: "headerStyle",
  },
  {
    field: "completedJobs",
    headerName: "Completed # of Jobs",
    flex: 1,
    headerClassName: "headerStyle",
  },
  {
    field: "completedRevenue",
    headerName: "Completed Revenue",
    width: 100,
    headerClassName: "headerStyle",
  },
  {
    field: "averageRevenuePerJob",
    headerName: "Average Revenue Per Job",
    width: 90,
    headerClassName: "headerStyle",
  },
];

const ReportTable = React.memo(function ReportTable({ data, selectedCities }) {
  const rows = data
    .map((row, index) => {
      return {
        id: index + 1,
        postalCodeFSA: row["Postal Code FSA"],
        city: row["Location City"],
        completedJobs: row["Completed Jobs"],
        completedRevenue: row["Completed Revenue"],
        averageRevenuePerJob: row["Average Revenue Per Job"],
      };
    })
    .filter((row) => {
      if (selectedCities.length === 0) return true;
      const currentCity = row["city"].toString().trim();
      return selectedCities.includes(currentCity);
    });

  return (
    <Box sx={{ height: "90vh", width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        disableColumnFilter={true}
        disableColumnMenu={true}
        disableColumnSelector={true}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 20,
            },
          },
        }}
        pageSizeOptions={[20]}
        disableRowSelectionOnClick
        rowHeight={30}
        headerHeight={100}
        getRowClassName={(params) =>
          params.id % 2 === 0 ? "evenRow" : "oddRow"
        }
      />
    </Box>
  );
});

export default ReportTable;
