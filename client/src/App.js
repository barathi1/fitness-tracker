import React from "react";
// rename browserRouter as router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";  

// import pages and components
import Home from "./pages/Home";
import History from "./pages/History";
import Exercise from "./pages/Exercise";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Error from "./pages/Error";
import SingleExercise from "./components/SingleExercise"
import Cardio from "./components/Cardio";
import Resistance from "./components/Resistance";
import Dashboard from "./components/Dashboard/Dashboard";
import WorkoutTracker from "./components/workout/tracker";
import NutritionTracker from "./components/Nutrision/Nutrision";
import WaterTracker from "./components/water/tracker";
import SleepTracker from "./components/sleep/tracker";
import Goals from "./components/GOAL/goal";
import Header from "./components/Header";
import ProgressAnalytics from "./components/progress/Analytics";
import Reminders from "./components/remainder/remainder";
import FitnessLibrary from "./components/library/library";
import PersonalizedPlans from "./components/personalisedplans/PersonalizedPlans";
import Profile from "./pages/Profile";
import ReminderApp from "./components/sleep/reaminderAlarm";



function App() {
  return (
    <Router>
      <Header/>
      <ReminderApp/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/history" element={<History />} />
        <Route path="/history/:type/:id" element={<SingleExercise />} />
        <Route path="/exercise" element={<Exercise />} />
        <Route path="/exercise/cardio" element={<Cardio />} />
        <Route path="/exercise/resistance" element={<Resistance />} />
      
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/workout" element={<History />} />
        <Route path="/nutrition" element={<NutritionTracker />} />

        <Route path="/water" element={<WaterTracker />} />
        <Route path="/sleep" element={<SleepTracker />} />

        <Route path="/goals" element={<Goals />} />
        <Route path="/analytics" element={<ProgressAnalytics />} />

        <Route path="/reminders" element={<Reminders />} />
        <Route path="/library" element={<FitnessLibrary />} />
        <Route path="/plans" element={<PersonalizedPlans />} />
        <Route path="/profile" element={<Profile />} />
    

        {/* ProgressAnalytics */}

        
        <Route path="*" element={<Error />} />
      </Routes>
    </Router >
  );
}

export default App;
