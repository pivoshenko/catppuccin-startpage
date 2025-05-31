# Clock Component

- [Clock Component](#clock-component)
  - [Overview](#overview)
  - [Time Format Options](#time-format-options)
  - [Configuration](#configuration)
    - [Main Clock Configuration](#main-clock-configuration)
    - [Multiple Time Zones](#multiple-time-zones)
  - [IANA Timezone Names](#iana-timezone-names)
    - [Common Timezone Names](#common-timezone-names)
    - [Legacy Time Zone Offsets](#legacy-time-zone-offsets)

## Overview

The clock component has been enhanced to support multiple features:

- 12-hour and 24-hour time formats
- Multiple clocks for different time zones displayed in a row
- Customizable formatting options
- Locale support for regional time display

## Time Format Options

The clock format uses an extended version of the `strftime` function with the following format specifiers:

| Format | Description                         | Example               |
| ------ | ----------------------------------- | --------------------- |
| `H`    | 24-hour format without leading zero | 9, 15                 |
| `h`    | 24-hour format with leading zero    | 09, 15                |
| `K`    | 12-hour format without leading zero | 9, 3                  |
| `k`    | 12-hour format with leading zero    | 09, 03                |
| `i`    | Minutes with leading zero           | 05, 30                |
| `M`    | Minutes without leading zero        | 5, 30                 |
| `s`    | Seconds with leading zero           | 08, 45                |
| `S`    | Seconds without leading zero        | 8, 45                 |
| `p`    | AM/PM uppercase                     | AM, PM                |
| `P`    | AM/PM lowercase                     | am, pm                |
| `A`    | Full weekday name                   | Monday, Tuesday       |
| `a`    | Abbreviated weekday name            | Mon, Tue              |
| `B`    | Full month name                     | January, February     |
| `b`    | Abbreviated month name              | Jan, Feb              |
| `d`    | Day of month with leading zero      | 01, 28                |
| `e`    | Day of month without leading zero   | 1, 28                 |
| `Y`    | Full year                           | 2025                  |
| `y`    | Two-digit year                      | 25                    |
| `z`    | Full localized date and time        | 5/31/2025, 9:30:45 PM |

## Configuration

### Main Clock Configuration

In your `userconfig.js` file, you can configure the main clock:

```javascript
clock: {
  format: "k:i p",      // 12-hour format with leading zero (09:30 PM)
  locale: "en-US",      // Locale for date/time formatting
  icon_color: palette.maroon,
},
```

### Multiple Time Zones

To display additional clocks with different time zones:

```javascript
additionalClocks: [
  // Method 1: Using IANA timezone names (preferred)
  {
    label: "NYC",             // Label displayed next to the clock
    timezone: "America/New_York", // IANA timezone name (handles DST automatically)
    format: "k:i p",          // Format (can be different from main clock)
    locale: "en-US",          // Locale setting (optional)
    icon_color: palette.blue  // Icon color (optional)
  },

  // Method 2: Using timezone offset (legacy method)
  {
    label: "Paris",
    timezoneOffset: +1,       // Hours offset from UTC (+1 for CET)
    format: "H:i",            // 24-hour format without leading zero
    locale: "fr-FR",
    icon_color: palette.green
  }
],
```

## IANA Timezone Names

Using IANA timezone names (e.g., "America/New_York") is preferred over timezone offsets as they automatically handle Daylight Saving Time changes.

### Common Timezone Names

| Region                  | IANA Timezone Name             |
| ----------------------- | ------------------------------ |
| London, UK              | Europe/London                  |
| Paris, France           | Europe/Paris                   |
| Berlin, Germany         | Europe/Berlin                  |
| Kyiv, Ukraine           | Europe/Kyiv                    |
| Dubai, UAE              | Asia/Dubai                     |
| New Delhi, India        | Asia/Kolkata                   |
| Bangkok, Thailand       | Asia/Bangkok                   |
| Singapore               | Asia/Singapore                 |
| Hong Kong               | Asia/Hong_Kong                 |
| Tokyo, Japan            | Asia/Tokyo                     |
| Sydney, Australia       | Australia/Sydney               |
| New York, USA           | America/New_York               |
| Chicago, USA            | America/Chicago                |
| Denver, USA             | America/Denver                 |
| Los Angeles, USA        | America/Los_Angeles            |
| Honolulu, USA           | Pacific/Honolulu               |
| São Paulo, Brazil       | America/Sao_Paulo              |
| Buenos Aires, Argentina | America/Argentina/Buenos_Aires |

### Legacy Time Zone Offsets

If you prefer using timezone offsets, you can still use the following values:

| City/Region               | UTC Offset |
| ------------------------- | ---------- |
| London (GMT/UTC)          | 0          |
| Paris, Berlin, Rome (CET) | +1         |
| Moscow                    | +3         |
| Dubai                     | +4         |
| New Delhi                 | +5.5       |
| Bangkok                   | +7         |
| Singapore, Hong Kong      | +8         |
| Tokyo                     | +9         |
| Sydney                    | +10        |
| New York (EST)            | -5         |
| Chicago (CST)             | -6         |
| Denver (MST)              | -7         |
| Los Angeles (PST)         | -8         |
| Honolulu                  | -10        |

Note: When using timezone offsets, the values provided are for standard time and don't automatically adjust for Daylight Saving Time.
