/* eslint-disable jsx-a11y/alt-text */
import { Box, Typography, Button } from "@mui/material";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay } from "swiper/modules";
import Yoga from "../assets/yoga.jpg";
import { ArrowForward } from "@mui/icons-material";
import PreviousActivities from "./PreviousActivities";
const OurSessions = () => {
  const SlideData = [
    {
      name: "Free Yoga Course",
      description:
        "Experience the benefits of yoga with our Free Yoga Course. From flexibility to inner peace, join us for sessions that cater to all levels. Elevate your well-being at no cost – because your health matters.",

      duration: "7 days",
      image: Yoga,
    },
    {
      name: "Free Yoga Course",
      description:
        "Experience the benefits of yoga with our Free Yoga Course. From flexibility to inner peace, join us for sessions that cater to all levels. Elevate your well-being at no cost – because your health matters.",
      duration: "7 days",
      image: Yoga,
    },
    {
      name: "Free Yoga Course",
      description:
        "Experience the benefits of yoga with our Free Yoga Course. From flexibility to inner peace, join us for sessions that cater to all levels. Elevate your well-being at no cost – because your health matters.",

      duration: "7 days",
      image: Yoga,
    },
    {
      name: "Free Yoga Course",
      description:
        "Experience the benefits of yoga with our Free Yoga Course. From flexibility to inner peace, join us for sessions that cater to all levels. Elevate your well-being at no cost – because your health matters.",

      duration: "7 days",
      image: Yoga,
    },
    {
      name: "Free Yoga Course",
      description:
        "Experience the benefits of yoga with our Free Yoga Course. From flexibility to inner peace, join us for sessions that cater to all levels. Elevate your well-being at no cost – because your health matters.",

      duration: "7 days",
      image: Yoga,
    },
    {
      name: "Free Yoga Course",
      description:
        "Experience the benefits of yoga with our Free Yoga Course. From flexibility to inner peace, join us for sessions that cater to all levels. Elevate your well-being at no cost – because your health matters.",

      duration: "7 days",
      image: Yoga,
    },
    {
      name: "Free Yoga Course",
      description:
        "Experience the benefits of yoga with our Free Yoga Course. From flexibility to inner peace, join us for sessions that cater to all levels. Elevate your well-being at no cost – because your health matters.",

      duration: "7 days",
      image: Yoga,
    },
  ];
  return (
    <>
      <Box>
        <Typography
          marginLeft={"5%"}
          marginTop={"5%"}
          fontSize={"54px"}
          color={"#CAA0C3"}
          fontWeight={600}
        >
          {" "}
          Our Live Sessions
        </Typography>
        <Swiper
          slidesPerView={1.2}
          pagination={true}
          modules={[Autoplay]}
          style={{
            borderRadius: "12px",
            marginTop: "33px",
            marginBottom: "30px",
            height: "23vw",
            width: "81%",
          }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
        >
          {SlideData.map((list, index) => (
            <SwiperSlide
              style={{
                position: "relative",
                width: "40%",
                height: "100%",
                marginLeft: "5%",
                marginRight: "5%",
              }}
              key={index}
            >
              <img
                src={list.image}
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "12px",
                }}
              />
              <Box
                display={"flex"}
                flexDirection={"column"}
                position={"absolute"}
              >
                <Typography
                  sx={{
                    top: "0",
                    fontSize: "35px",
                    fontWeight: "600",
                    marginTop: "5%",
                    marginLeft: "5%",
                  }}
                >
                  {list.name}
                </Typography>
                <Typography
                  sx={{
                    top: "0",
                    fontSize: "16px",
                    fontWeight: "500",
                    marginLeft: "5%",
                    marginTop: "1.25%",
                    width: "30%",
                  }}
                >
                  {list.description}
                </Typography>
                <Typography
                  sx={{
                    top: "0",
                    fontSize: "24px",
                    fontWeight: "600",
                    marginLeft: "5%",
                    marginTop: "1.25%",
                    width: "30%",
                  }}
                >
                  {list.duration}
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    width: "fit-content",
                    borderRadius: "6px",
                    backgroundColor: "transparent",
                    fontSize: "14px",
                    border: "1.5px solid black",
                    color: "black",
                    padding: "10px 24px",
                    marginLeft: "5%",
                    marginTop: "2%",
                    textTransform: "none",
                    boxShadow: "none",
                    flex: "1",
                    marginBottom: "39px",
                    "&:hover": {
                      backgroundColor: "#3955D9",
                      color: "white",
                      padding: "10px 24px",
                      boxShadow: "none",
                    },
                    "& $arrowIcon": {
                      color: "white",
                    },
                  }}
                >
                  Explore More
                  <ArrowForward
                    sx={{
                      marginLeft: "10px",
                    }}
                    className="arrowIcon"
                  />
                </Button>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
        <PreviousActivities/>
      </Box>
    </>
  );
};

export default OurSessions;
