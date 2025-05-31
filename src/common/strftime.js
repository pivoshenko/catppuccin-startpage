/*
+----------+
| STRFTIME |
+----------+
Author: https://github.com/b-coimbra
Description:
A simple strftime function implementation in JavaScript, without the percentage notation
Based on https://strftime.org

USAGE:
new Date().strftime("H:M p - A") => 21:32 AM - Thursday
new Date().strftime("m/b/Y")     => 1/Jan/2018
new Date().strftime("do B Y")    => 18th January 2018
new Date().strftime("h:i p")     => 09:32 PM (12-hour format)
new Date().strftime("K:i p")     => 9:32 PM (12-hour format without leading zero)

This function extends Date.prototype and provides flexible date formatting for the startpage
*/

// Create a date object for a specific timezone using IANA timezone names
// Example: Date.createWithTimezone("America/New_York")
Date.createWithTimezone = function (timezone = null) {
  const date = new Date();

  if (!timezone) {
    return date;
  }

  const isoDate = date.toISOString();

  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false
  });

  const parts = formatter.formatToParts(date);

  const formatParts = {};
  parts.forEach(part => {
    formatParts[part.type] = part.value;
  });

  // Create new date object with the timezone-adjusted values
  return new Date(
    formatParts.year,
    parseInt(formatParts.month) - 1, // Month is 0-based
    formatParts.day,
    formatParts.hour,
    formatParts.minute,
    formatParts.second
  );
};

// Add ability to create a Date with a specific timezone offset in hours (legacy method)
Date.createWithTimezoneOffset = function (timezoneOffsetHours = 0) {
  const localDate = new Date();

  // Get the local timezone offset in minutes
  const localOffset = localDate.getTimezoneOffset();

  // Calculate the target timezone offset in milliseconds
  const targetOffsetMs = (localOffset + timezoneOffsetHours * 60) * 60 * 1000;

  // Adjust the time
  return new Date(localDate.getTime() + targetOffsetMs);
};

// Extended Date prototype with strftime functionality for flexible date formatting
Date.prototype.strftime = function (format = "c", locale = "en-US") {
  const date = this;

  // Validate date object
  const isValid = (date) => date instanceof Date && !isNaN(date);

  if (!isValid(date)) throw date;

  // Add padding method to numbers for formatting
  Number.prototype.pad = function (n = 2) {
    return (Array(n).join("0") + this).substr(-n);
  };

  // Add ordinal suffix method to numbers (1st, 2nd, 3rd, etc.)
  Number.prototype.ord = function () {
    return (
      {
        1: "st",
        2: "nd",
        3: "rd",
      }[(num = this.toString()).length > 1 ? parseInt(num.split("")[1]) : num] || "th"
    );
  };

  // Month and day name arrays for formatting
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
    days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    result = [],
    // Calculate hours in different formats
    hours24 = date.getHours(),
    hours12 = hours24 % 12 || 12, // Convert 0 to 12 for 12 AM
    // Format mapping object for strftime codes
    formats = {
      a: days[date.getDay()].substr(0, 3),
      A: days[date.getDay()],
      w: date.getDay(),
      q: date.getDay().pad(),
      d: date.getDate().pad(),
      e: date.getDate(),
      b: month[date.getMonth()].substr(0, 3),
      B: month[date.getMonth()],
      m: date.getMonth() + 1,
      N: (date.getMonth() + 1).pad(),
      y: date.getFullYear().pad(),
      Y: date.getFullYear(),
      // 24-hour format without leading zero
      H: hours24,
      // 24-hour format with leading zero
      h: hours24.pad(),
      // 12-hour format without leading zero
      K: hours12,
      // 12-hour format with leading zero
      k: hours12.pad(),
      p: hours24 >= 12 ? "PM" : "AM",
      // Lowercase am/pm
      P: hours24 >= 12 ? "pm" : "am",
      o: date.getDate().ord(),
      M: date.getMinutes(),
      i: date.getMinutes().pad(),
      S: date.getSeconds(),
      s: date.getSeconds().pad(),
      f: date.getMilliseconds(),
      c: date.toDateString() + " - " + date.toTimeString(),
      x: date.toLocaleDateString(locale),
      X: date.toLocaleTimeString(locale),
      // Full localised date and time
      z: date.toLocaleString(locale),
    };

  // Parse format string and replace format codes with values
  format.split(/(\w|.)/m).forEach((type) => {
    if (type) result.push(typeof formats[type] === "undefined" ? type : formats[type]);
  });

  return result.join("");
};
