import Amplitude from "amplitude-js/amplitude";

const key = "b87e5a75ab4b6bac5d50ba429b62e6be";

const getInstance = () => {
  let instance = Amplitude.getInstance();
  console.log(instance);
  instance.init(key);
  instance.setVersionName(process.env.VERSION);
  return instance;
};

const getFakeInstance = () => {
  return {
    setVersionName() {
      return this;
    },
    logEvent() {
      return this;
    }
  };
};

export default (process.env.NODE_ENV === "production"
  ? getInstance()
  : getFakeInstance());

export const reduxMiddleware = instance => store => next => action => {
  const { meta, type } = action;
  if (meta && meta.amplitude && instance.logEvent)
    instance.logEvent(type, meta.amplitude);
  return next(action);
};
