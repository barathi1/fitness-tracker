import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  IconButton,
} from "@mui/material";

import { FaDumbbell, FaAppleAlt, FaBed, FaChartLine } from "react-icons/fa";
// import SearchIcon from "@mui/icons-material/Search";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, LineChart, Line } from "recharts";
import ProgressTables from "./table";


const ProgressAnalytics = () => {
  const [progressData, setProgressData] = useState({});
  const [filteredData, setFilteredData] = useState({});
  const [search, setSearch] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  
  const API_URL = "http://localhost:3001/api/progress/"+user._id;
  useEffect(() => {
    fetchProgressData();
  }, []);

  const fetchProgressData = async () => {
    try {
      const response = await axios.get(API_URL);
      setProgressData(response.data.progress);
      setFilteredData(response.data.progress);
    } catch (error) {
      console.error("Error fetching progress data:", error);
    }
  };

  const handleSearch = (event) => {
    const keyword = event.target.value.toLowerCase();
    setSearch(keyword);
    filterData(keyword);
  };

  const filterData = (keyword) => {
    const newData = { ...progressData };
    if (keyword) {
      Object.keys(newData).forEach((key) => {
        newData[key] = newData[key].filter((item) =>
          item.name?.toLowerCase().includes(keyword) || item.title?.toLowerCase().includes(keyword)
        );
      });
    }
    setFilteredData(newData);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" fontWeight="bold" color="primary" mb={3}>
        <FaChartLine /> Progress Analytics
      </Typography>

      {/* Search */}
      <Grid container spacing={2} mb={3}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            variant="outlined"
            label="Search"
            value={search}
            onChange={handleSearch}
            InputProps={{
              endAdornment: (
                <IconButton>
                  {/* <SearchIcon /> */}
                </IconButton>
              ),
            }}
          />
        </Grid>
      </Grid>

      {/* Cards */}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Card sx={{ textAlign: "center", boxShadow: 3 }}>
            <CardContent>
              <FaDumbbell size={50} color="#007bff" />
              <Typography variant="h6">Workouts</Typography>
              <Typography color="textSecondary">
                {filteredData.cardio?.length || 0} Cardio Sessions
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ textAlign: "center", boxShadow: 3 }}>
            <CardContent>
              <FaAppleAlt size={50} color="green" />
              <Typography variant="h6">Nutrition</Typography>
              <Typography color="textSecondary">
                {filteredData.nutritionTracking?.length || 0} Meals Tracked
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ textAlign: "center", boxShadow: 3 }}>
            <CardContent>
              <FaBed size={50} color="#ffc107" />
              <Typography variant="h6">Sleep</Typography>
              <Typography color="textSecondary">
                Avg Sleep: {filteredData.sleep?.length > 0 ? (filteredData.sleep.reduce((acc, item) => acc + item.sleepHours, 0) / filteredData.sleep.length).toFixed(1) : 0} hrs
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Charts */}
      <Grid container spacing={3} mt={4}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" align="center">Calories Intake</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={filteredData.nutritionTracking || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="calories" fill="#007bff" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" align="center">Sleep Trends</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={filteredData.sleep || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="sleepHours" stroke="green" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
{/* tables */}
<ProgressTables/>

    </Container>
  );
};

export default ProgressAnalytics;
