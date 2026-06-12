import ReactGA from "react-ga4";

const MEASUREMENT_ID = "G-18D06GGB1B"; // Replace with your Google Analytics Measurement ID

export const initGA = () => {
  ReactGA.initialize(MEASUREMENT_ID);
};

export const trackPageView = (path: string) => {
  ReactGA.send({
    hitType: "pageview",
    page: path,
  });
};