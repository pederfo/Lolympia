import Constants from "expo-constants";

settings = {
  dev: {},
  staging: {},
  prod: {},
};

const getCurrentSettings = () => {
  if (__DEV__) return settings.dev;
  if (Constants.manifest.releaseChannel === "staging") return settings.staging;
  return settings.prod;
};

export default getCurrentSettings();
