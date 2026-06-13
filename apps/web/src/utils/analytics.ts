import ReactGA from "react-ga4";

const MEASUREMENT_ID = "G-RPBXL5P57B";

export const initGA = () => {
  ReactGA.initialize(MEASUREMENT_ID);
};

export const trackPageView = (path: string) => {
  ReactGA.send({
    hitType: "pageview",
    page: path,
  });
};