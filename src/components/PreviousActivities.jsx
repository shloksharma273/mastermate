import React from "react";
import { Box, Typography, Card, CardContent, Grid, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const PreviousActivities = () => {
  const navigate=useNavigate()
  const sessions = [
    {
      sessionType: "Physiotherapy",
      avgTime: 180,
      exercises: [
        {
          name: "Finger Curls",
          sets: 3,
          reps: 20,
          bodyPartsInvolved: ["Elbow", "Wrist"],
          timeTaken: 180,
        },
        // Add more exercises if needed
      ],
    },
    {
      sessionType: "HomeSet",
      avgTime: 180,
      exercises: [
        {
          name: "Finger Curls",
          sets: 3,
          reps: 20,
          bodyPartsInvolved: ["Elbow", "Wrist"],
          timeTaken: 180,
        },
        // Add more exercises if needed
      ],
    },
    // Add more sessions if needed
  ];

  return (
    <Grid  container spacing={2}>
      {sessions.map((session, index) => (
        <Grid   item xs={12} md={6} key={index}>
          <Card  style={{ backgroundColor: "#FFB6C1", padding: 16 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom style={{ color: "#fff" }}>
                Session Type: {session.sessionType}
              </Typography>
              <Typography style={{ color: "#fff" }}>
                Average Time: {session.avgTime} seconds
              </Typography>

              {session.exercises.map((exercise, index) => (
                <Card key={index} style={{ backgroundColor: "#FFC0CB", marginTop: 16 }}>
                  <CardContent>
                    <Typography variant="subtitle1" gutterBottom style={{ color: "#fff" }}>
                      {exercise.name}
                    </Typography>
                    <Typography style={{ color: "#fff" }}>
                      Sets: {exercise.sets} | Reps: {exercise.reps}
                    </Typography>
                    <Typography style={{ color: "#fff" }}>
                      Body Parts Involved:{" "}
                      {exercise.bodyPartsInvolved.join(", ")}
                    </Typography>
                    <Typography style={{ color: "#fff" }}>
                      Time Taken: {exercise.timeTaken} seconds
                    </Typography>
                  </CardContent>
                  <Button onClick={()=>navigate(`/session/${2}`)} sx={{marginLeft:'1rem', color:'white', borderColor:'white'}} variant="outlined">View Analytics</Button>
                </Card>
              ))}
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default PreviousActivities;
