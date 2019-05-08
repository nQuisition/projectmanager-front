export function dateToTimestamp(date) {
  return new Date(date.endsWith("Z") ? date : `${date}Z`).getTime();
}

export function formatDateDefault(timestamp) {
  const date = new Date(timestamp);
  return `${date.getDate()}.${date.getMonth() +
    1}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
}

const minutes = 1000 * 60;
const hours = minutes * 60;
const days = hours * 24;
const weeks = days * 7;

export function getDateDelta(timestamp) {
  const now = Date.now();
  const delta = now - timestamp;
  let deltaTime;
  let deltaUnit;
  if (delta < hours) {
    deltaTime = Math.ceil(delta / minutes);
    deltaUnit = "minute";
  } else if (delta < days) {
    deltaTime = Math.round(delta / hours);
    deltaUnit = "hour";
  } else if (delta < weeks) {
    deltaTime = Math.round(delta / days);
    deltaUnit = "day";
  } else {
    deltaTime = Math.round(delta / weeks);
    deltaUnit = "week";
  }
  if (deltaTime !== 1) {
    deltaUnit = deltaUnit + "s";
  }
  return `${deltaTime} ${deltaUnit}`;
}

export function capitalize(word) {
  return `${word[0].toUpperCase()}${word.split(1)}`;
}

const emailRegularExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export function isEmailValid(email) {
  return emailRegularExpression.test(String(email).toLowerCase());
}

export function validateEmail(email) {
  if (!email || email.length <= 0) {
    return "Email must be non-empty";
  }
  if (!isEmailValid(email)) {
    return "Invalid email";
  }
  return false;
}
