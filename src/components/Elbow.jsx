import React, { useState, useEffect } from "react";
import {
  Typography,
  List,
  ListItem,
  Container,
  Button,
  Box,
} from "@mui/material";
import ROSLIB from "roslib";
import Modal from "@mui/material/Modal";
const Elbow = ({ messages }) => {
  const [connected, setConnected] = useState(false);
  const [ros, setRos] = useState(null);
  const [elbowMessages, setElbowMessages] = useState([]);
  const [countMessages, setCountMessages] = useState([]);
  const [countMax, setCountMax] = useState(15);
  const [thresholdValue, setThresholdValue] = useState(90);
  const [open, setOpen] = useState(false);
  const [goodGoingCount, setGoodGoingCount] = useState(0);
  useEffect(() => {
    const initConnection = () => {
      const rosInstance = new ROSLIB.Ros({
        url: "ws://localhost:9090",
      });

      rosInstance.on("connection", () => {
        console.log("Connection established!");
        setConnected(true);
        setRos(rosInstance);
        subscribeToElbowTopic(rosInstance);
        subscribeToCountTopic(rosInstance);
      });

      rosInstance.on("close", () => {
        console.log("Connection is closed!");
        setConnected(false);

        // Try to reconnect every 3 seconds
        setTimeout(() => {
          try {
            rosInstance.connect("ws://localhost:9090");
          } catch (error) {
            console.log("Connection problem");
          }
        }, 3000);
      });
    };

    const subscribeToElbowTopic = (rosInstance) => {
      if (rosInstance) {
        try {
          const elbowListener = new ROSLIB.Topic({
            ros: rosInstance,
            name: "/elbow",
            messageType: "std_msgs/Float32",
          });

          elbowListener.subscribe((message) => {
            console.log("Received message from /elbow topic:", message);
            setElbowMessages([message.data]);
          });

          console.log("Subscription to /elbow topic successful.");
        } catch (error) {
          console.error("Error during subscription to /elbow topic:", error);
        }
      } else {
        console.error("ROS connection not initialized.");
      }
    };
    const subscribeToCountTopic = (rosInstance) => {
      if (rosInstance) {
        try {
          const countListener = new ROSLIB.Topic({
            ros: rosInstance,
            name: "/current_count",
            messageType: "std_msgs/Int32",
          });

          countListener.subscribe((message) => {
            console.log("Received message from /count topic:", message);
            setCountMessages([message.data]);
            setGoodGoingCount(message.data);
          });

          console.log("Subscription to /count topic successful.");
        } catch (error) {
          console.error("Error during subscription to /count topic:", error);
        }
      } else {
        console.error("ROS connection not initialized.");
      }
    };

    initConnection();
    return () => {
      if (ros) {
        ros.close();
      }
    };
  }, []);

  const publishThresholdMessage = () => {
    if (ros) {
      const thresholdPublisher = new ROSLIB.Topic({
        ros: ros,
        name: "/threshold",
        messageType: "std_msgs/Float32",
      });

      const thresholdMessage = new ROSLIB.Message({
        data: thresholdValue,
      });

      thresholdPublisher.publish(thresholdMessage);
      console.log("Published message to /threshold topic:", thresholdValue);
    } else {
      console.error("ROS connection not initialized.");
    }
  };
  const publishCountMessage = () => {
    if (ros) {
      const thresholdPublisher = new ROSLIB.Topic({
        ros: ros,
        name: "/required_count",
        messageType: "std_msgs/Int32",
      });

      const countMessage = new ROSLIB.Message({
        data: countMax,
      });

      thresholdPublisher.publish(countMessage);
      console.log("Published message to /count topic:", countMax);
    } else {
      console.error("ROS connection not initialized.");
    }
  };

  console.log(messages && messages[0], "gu");

  // useEffect(() => {
  //   if (messages && messages[0] >= 40 && messages[0] <= 70) {
  //     setGoodGoingCount((prevCount) => prevCount + 1);
  //   }
  // }, [messages]);
  const startactivity = () => {
    publishCountMessage();
    publishThresholdMessage();
  };
  if (goodGoingCount === countMax) {
    setOpen(true);
  }
  return (
    <>
      {elbowMessages && (
        <Container maxWidth="md">
          <Box display={"flex"} flexDirection={"column"}>
            <Typography variant="h1" gutterBottom>
              Elbow Exercise
            </Typography>
            <Typography variant="body2" gutterBottom>
              according to last sessions and data each set is of 25 counts or
              repitions.
            </Typography>
          </Box>
          <List>
            {elbowMessages?.map((message, index) => (
              <ListItem key={index}>
                <Typography fontSize={"35px"} variant="body1">
                  {message}
                </Typography>
              </ListItem>
            ))}
          </List>

          <Typography
            fontFamily={"poppins"}
            fontSize={"35px"}
            sx={{ color: "green", fontWeight: "600" }}
          >
            {thresholdValue} is the Angle threshold
          </Typography>

          <Typography fontSize={"35px"} variant="body1">
            Excersice count : {goodGoingCount}/{countMax}
          </Typography>

          <Button
            variant="contained"
            sx={{
              boxShadow: "none",
              padding: "14px 32px",
              marginTop: "15px",
            }}
            onClick={startactivity}
          >
            Start Activity
          </Button>
        </Container>
      )}
    </>
  );
};

export default Elbow;
