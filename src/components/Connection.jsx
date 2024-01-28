import React, { useState, useEffect } from "react";
import { Alert, Box, Container, Button, Typography } from "@mui/material";
import Elbow from "./Elbow";
import ROSLIB from "roslib";
import Human from "../assets/Hooman.png";

const Connection = () => {
  const [connected, setConnected] = useState(false);
  const [ros, setRos] = useState(null);
  const [elbowMessages, setElbowMessages] = useState([]);
  const [countMessages, setCountMessages] = useState([]);
  const [countMax, setCountMax] = useState(25);
  const [thresholdValue, setThresholdValue] = useState(90);

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
  return (
    // <Container maxWidth="md">
    //   <Alert
    //     className="text-center m-3"
    //     variant={connected ? "success" : "danger"}
    //   >
    //     {connected ? "Server Connected" : "Server Disconnected"}
    //   </Alert>

    //   <div>
    //     <Elbow messages={elbowMessages} />
    //     <Box fontSize={"35px"}>
    //       {JSON.stringify(elbowMessages) === "[4]" ? "true" : "false"}
    //     </Box>
    //     <Box fontSize={"35px"}>{JSON.stringify(countMessages)}</Box>
    //     {/* <div>
    //       <Button variant="outlined" onClick={publishThresholdMessage}>
    //         publishThresholdMessage
    //       </Button>
    //       <Button variant="outlined" onClick={publishCountMessage}>
    //         publishThresholdMessage
    //       </Button>
    //     </div> */}

    //   </div>
    // </Container>
    <>
      <Box
        display={"flex"}
        flexDirection={"column"}
        gap={"7px"}
        marginLeft={"5%"}
        marginTop={"5%"}
      >
        <Typography fontSize={"54px"} fontWeight={"600"}>
          Start An Activity
        </Typography>
        <Typography fontSize={"22px"} fontWeight={500}>
          Choose a part to exercise and start a new session
        </Typography>
      </Box>
      <Box position={"relative"} left={"30%"} marginTop={"5%"}>
        <img
          src={Human}
          alt=""
          style={{ position: "absolute", top: 0, left: 0, zIndex: "-999" }}
        />
        <Typography
          position={"absolute"}
          zIndex={99}
          borderRadius={"8px"}
          padding={"14px 34px"}
          sx={{
            top: "70px",
            left: "30%",
            backgroundColor: "rgba(0, 255, 117, 0.41)",
            "&:hover": {
              backgroundColor: "rgba(0, 255, 117, 0.81)",
            },
            cursor: "pointer",
          }}
        >
          Shoulder
        </Typography>
        <Typography
          position={"absolute"}
          zIndex={99}
          borderRadius={"8px"}
          padding={"14px 34px"}
          onClick={() => (window.location = "/elbow")}
          sx={{
            top: "101px",
            left: "-5%",
            backgroundColor: "rgba(0, 255, 117, 0.41)",
            "&:hover": {
              backgroundColor: "rgba(0, 255, 117, 0.81)",
            },
            cursor: "pointer",
          }}
        >
          Elbow
        </Typography>
        <Typography
          position={"absolute"}
          zIndex={99}
          borderRadius={"8px"}
          padding={"14px 34px"}
          sx={{
            top: "184px",
            left: "37%",
            backgroundColor: "rgba(0, 255, 117, 0.41)",
            "&:hover": {
              backgroundColor: "rgba(0, 255, 117, 0.81)",
            },
            cursor: "pointer",
          }}
        >
          Wrist
        </Typography>
        <Typography
          position={"absolute"}
          zIndex={99}
          borderRadius={"8px"}
          padding={"14px 34px"}
          sx={{
            top: "318px",
            left: "30%",
            backgroundColor: "rgba(0, 255, 117, 0.41)",
            "&:hover": {
              backgroundColor: "rgba(0, 255, 117, 0.81)",
            },
            cursor: "pointer",
          }}
        >
          Knee
        </Typography>
        <Typography
          position={"absolute"}
          zIndex={99}
          borderRadius={"8px"}
          padding={"14px 34px"}
          sx={{
            top: "377px",
            left: "-1%",
            backgroundColor: "rgba(0, 255, 117, 0.41)",
            "&:hover": {
              backgroundColor: "rgba(0, 255, 117, 0.81)",
            },
            cursor: "pointer",
          }}
        >
          Ankle
        </Typography>
      </Box>
    </>
  );
};

export default Connection;
