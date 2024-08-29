import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import "./dashboard.css";
import Appbar from "../../components/Appbar";
import ShowsDashboard from "../../components/dashboard/shows";
import CategoryDashboard from "../../components/dashboard/category";

const Dashboard = () => {
  const [selectedMenuIndex, setSelectedMenuIndex] = useState(0);
  // temp data
  const menuViewPages = [<ShowsDashboard />, <CategoryDashboard />];

  return (
    <div className="dash-shows">
      <Appbar />
      <Box sx={{ width: "100%" }}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            display: "flex",
            justifyContent: "center",
            backgroundColor: "white",
          }}
        >
          <Tabs
            value={selectedMenuIndex}
            onChange={(_, newValue) => setSelectedMenuIndex(newValue)}
            scrollButtons="auto"
            variant="scrollable"
          >
            <Tab label="Shows" />
            <Tab label="Category" />
          </Tabs>
        </Box>
        {menuViewPages.map((comp, index) => (
          <div key={index}>{index === selectedMenuIndex && comp}</div>
        ))}
      </Box>
    </div>
  );
};

export default Dashboard;
