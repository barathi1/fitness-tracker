import React from "react";
import { useNavigate } from "react-router-dom";
import Auth from "../utils/auth";
import { Container, Box, Typography, Button, Grid, Card, CardContent } from "@mui/material";
import { motion } from "framer-motion";

export default function Home() {
  const navigate = useNavigate();
  const loggedIn = Auth.loggedIn();

  if (loggedIn) {
    navigate("/dashboard");
  }

  const features = [
    { icon: "💪", title: "Strength Training", desc: "Log your weights and track progress." },
    { icon: "🏃‍♂️", title: "Cardio Tracking", desc: "Monitor running, cycling, and HIIT." },
    { icon: "🧘‍♀️", title: "Yoga & Flexibility", desc: "Improve mobility and relaxation." }
  ];

  const fitnessTopics = [
    "💪 Strength Training: Strength training involves using resistance, such as weights or bodyweight, to build muscle and improve overall strength. Exercises like squats, deadlifts, and bench presses help enhance muscle growth, endurance, and bone density. Regular strength training reduces the risk of injuries and boosts metabolism.",
    "🏃‍♂️ Cardio Workouts: Cardiovascular exercises improve heart health, endurance, and calorie burn. Running, cycling, swimming, and jump rope workouts help enhance lung capacity and stamina. Incorporating at least 150 minutes of moderate cardio per week keeps your heart healthy and body active.",
    "🥦 Nutrition & Diet: A balanced diet fuels your body for workouts and recovery. Eating protein-rich foods supports muscle growth, while healthy fats and carbohydrates provide essential energy. Hydration is equally crucial for maintaining optimal performance and avoiding fatigue.",
    "🧘‍♀️ Flexibility & Mobility: Stretching and mobility exercises increase range of motion, prevent injuries, and aid in recovery. Yoga and dynamic stretches keep muscles limber, improving overall athletic performance and posture.",
    "💤 Sleep & Recovery: Proper rest is essential for muscle repair and energy restoration. Aiming for 7-9 hours of quality sleep per night ensures optimal recovery and peak performance. Incorporating rest days in training prevents overuse injuries.",
    "🔥 Fat Loss Strategies: Combining strength training, cardio, and a calorie-controlled diet is key to fat loss. High-Intensity Interval Training (HIIT) workouts are particularly effective in burning fat while preserving muscle mass.",
    "🏋️‍♂️ Weightlifting Techniques: Proper weightlifting form prevents injuries and maximizes gains. Progressive overload, maintaining controlled movements, and ensuring a full range of motion in exercises lead to improved strength and muscle hypertrophy.",
    "🚴‍♂️ Endurance Training: Training for endurance requires consistency and gradual intensity increases. Long-distance running, cycling, and rowing build stamina and cardiovascular fitness over time, benefiting both athletes and casual fitness enthusiasts.",
    "🥗 Healthy Eating Habits: Developing a sustainable meal plan with nutrient-dense foods helps maintain long-term health. Eating whole foods, avoiding processed sugars, and portion control contribute to a fit lifestyle.",
    "🏆 Motivation & Goal Setting: Setting realistic fitness goals keeps you focused and driven. Whether it's muscle gain, weight loss, or endurance improvement, tracking progress and celebrating milestones helps maintain motivation and discipline."
  ];

  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        px: 3,
        color: "#fff"
      }}
    >
      <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
        <Typography variant="h2" sx={{ fontWeight: "bold", mb: 2 }}>
          Your Ultimate Fitness Companion
        </Typography>
        <Typography variant="h6" sx={{ maxWidth: "600px", mb: 3 }}>
          Track your workouts, stay motivated, and achieve your fitness goals with our tracker.
        </Typography>
      </motion.div>

      <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}>
        <Button
          variant="contained"
          size="large"
          sx={{
            px: 4,
            py: 1.5,
            fontSize: "1rem",
            fontWeight: "bold",
            backgroundColor: "#ff6f61",
            "&:hover": { backgroundColor: "#ff3b30" }
          }}
          onClick={() => navigate(loggedIn ? "/exercise" : "/signup")}
        >
          {loggedIn ? "Add Exercise" : "Get Started"}
        </Button>
      </motion.div>

      <Container sx={{ mt: 5 }}>
        <Grid container spacing={4} justifyContent="center">
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Card sx={{ p: 3, textAlign: "center", bgcolor: "rgba(255, 255, 255, 0.2)", borderRadius: 3 }}>
                  <CardContent>
                    <Box sx={{ fontSize: 50, mb: 1, color: "#fff" }}>{feature.icon}</Box>
                    <Typography variant="h6" fontWeight="bold">{feature.title}</Typography>
                    <Typography>{feature.desc}</Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Container sx={{ mt: 5 }}>
       
      </Container>
    </Box>
  );
}
