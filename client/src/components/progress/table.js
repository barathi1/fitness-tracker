import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from "@mui/material";
import axios from "axios";

const ProgressTables = () => {
  const [data, setData] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    axios.get("http://localhost:3001/api/progress/"+user._id)
      .then(response => setData(response.data))
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  const renderTable = (title, headers, rows) => (
    <TableContainer component={Paper} sx={{ marginBottom: 3 }}>
      <Typography variant="h6" sx={{ padding: 2 }}>{title}</Typography>
      <Table>
        <TableHead>
          <TableRow>
            {headers.map((header, index) => (
              <TableCell key={index}><b>{header}</b></TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {Object.values(row).map((value, colIndex) => (
                <TableCell key={colIndex}>{value}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  if (!data) return <Typography>Loading...</Typography>;

  return (
    <div>
      {renderTable("Cardio Progress", ["Name", "Distance", "Duration", "Date"],
        data.progress.cardio.map(({ name, distance, duration, date }) => ({ name, distance, duration, date })))
      }
      {renderTable("Resistance Training", ["Name", "Weight", "Sets", "Reps", "Date"],
        data.progress.resistance.map(({ name, weight, sets, reps, date }) => ({ name, weight, sets, reps, date })))
      }
      {renderTable("Nutrition Tracking", ["Name", "Calories", "Date"],
        data.progress.nutritionTracking.map(({ name, calories, date }) => ({ name, calories, date })))
      }
      {renderTable("Goal Progress", ["Title", "Progress", "Email"],
        data.progress.goal.map(({ title, progress, email }) => ({ title, progress, email })))
      }
      {renderTable("Sleep Tracking", ["Date", "Sleep Hours"],
        data.progress.sleep.map(({ date, sleepHours }) => ({ date, sleepHours })))
      }
    </div>
  );
};

export default ProgressTables;
