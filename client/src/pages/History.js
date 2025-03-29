import React, { useState, useEffect } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { getMe } from '../utils/API';
import Auth from "../utils/auth";
import { formatDate } from '../utils/dateFormat';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, Typography, Box, Fade } from "@mui/material";
import { motion } from "framer-motion";
import cardioIcon from "../assets/images/cardio.png";
import resistanceIcon from "../assets/images/resistance.png";

export default function History() {
  const [userData, setUserData] = useState({});
  const [exerciseData, setExerciseData] = useState([]);
  const [displayedItems, setDisplayedItems] = useState(6);
  const [weeklyData, setWeeklyData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);

  const loggedIn = Auth.loggedIn();
  let currentDate;

  useEffect(() => {
    const getUserData = async () => {
      try {
        const token = loggedIn ? Auth.getToken() : null;
        if (!token) return;

        const response = await getMe(token);
        if (!response.ok) throw new Error("Something went wrong!");

        const user = await response.json();
        if (user.cardio && user.resistance) {
          const exercise = [...user.cardio, ...user.resistance];
          exercise.sort((a, b) => new Date(b.date) - new Date(a.date));
          exercise.forEach(item => item.date = formatDate(item.date));

          setUserData(user);
          setExerciseData(exercise);
          calculateProgress(exercise);
        }
      } catch (err) { console.error(err); }
    };
    getUserData();
  }, [loggedIn]);

  const calculateProgress = (data) => {
    const weekly = {};
    const monthly = {};
    data.forEach(({ date, type }) => {
      const week = date.slice(0, 7);
      const month = date.slice(0, 7);

      weekly[week] = (weekly[week] || 0) + 1;
      monthly[month] = (monthly[month] || 0) + 1;
    });
    setWeeklyData(Object.entries(weekly).map(([key, value]) => ({ week: key, count: value })));
    setMonthlyData(Object.entries(monthly).map(([key, value]) => ({ month: key, count: value })));
  };

  function showMoreItems() { setDisplayedItems(displayedItems + 6); }
  if (!loggedIn) return <Navigate to="/login" />;

  return (
    <>
    {/*  style={{display:"flex",alignItems:"center",justifyContent:"center",padding:"100px",}} */}
      <div style={{display:"flex",alignItems:"center",justifyContent:"center",padding:"100px",}}>
        <div className='history-container'>
          <h2 className='title'>Exercise History</h2>
          <div className='progress-section'>
            <div className='progress-chart'>
              <h3>Weekly Progress</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={weeklyData}>
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#4CAF50" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className='progress-chart'>
              <h3>Monthly Progress</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={monthlyData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#FF9800" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className='history-data'>
            {exerciseData.slice(0, displayedItems).map((exercise, index) => {
              let dateToDisplay;
              if (exercise.date !== currentDate) {
                currentDate = exercise.date;
                dateToDisplay = exercise.date;
              }
              return (
                <Fade in={true} timeout={500} key={exercise._id}>
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }}>
                    <Box sx={{ mb: 2 }}>
                      {dateToDisplay && <Typography variant="h6" sx={{ color: '#1976D2', mb: 1 }}>{dateToDisplay}</Typography>}
                      <Link to={`/history/${exercise.type}/${exercise._id}`} style={{ textDecoration: 'none' }}>
                        <Card sx={{ display: 'flex', alignItems: 'center', p: 2, boxShadow: 3, '&:hover': { boxShadow: 6 } }}>
                          <img alt={exercise.type} src={exercise.type === "cardio" ? cardioIcon : resistanceIcon} style={{ width: 50, height: 50, marginRight: 10 }} />
                          <CardContent>
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{exercise.name}</Typography>
                            <Typography variant="body2" sx={{ color: 'gray' }}>
                              {exercise.type === "cardio" ? `${exercise.distance} miles` : `${exercise.weight} lbs`}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Link>
                    </Box>
                  </motion.div>
                </Fade>
              );
            })}
            {exerciseData.length > displayedItems && (
              <button className='show-more' onClick={showMoreItems}>Show More</button>
            )}
          </div>
        </div>
      </div>

    </>
  );
}

