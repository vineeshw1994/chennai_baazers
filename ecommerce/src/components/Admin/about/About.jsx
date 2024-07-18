import React from "react";
import DashNavbar from "../dashboard/components/DashNavbar";

const About = () => {
  return (
    <div className="w-auto md:w-full lg:w-full xl:w-full mx-3">
      <DashNavbar />
      <div className="border-b-2"></div>
      <h1>About</h1>
    </div>
  );
};

export default About;
