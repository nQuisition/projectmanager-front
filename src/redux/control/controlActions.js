export const APP_INIT = "APP_INIT";
export const APP_INIT_SUCCESS = "APP_INIT_SUCCESS";

export function appInit() {
  return {
    type: APP_INIT
  };
}

export function appInitSuccess() {
  return {
    type: APP_INIT_SUCCESS
  };
}
