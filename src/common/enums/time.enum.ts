export enum TimeInMsEnum {
  ONE_SECOND = 1000,
  ONE_MINUTE = 60000,
  ONE_HOUR = 3600000,
  ONE_DAY = 86400000,
  ONE_WEEK = 604800000,
  ONE_MONTH = 2592000000,
  ONE_YEAR = 31536000000,
}

export enum DayOfWeekEnum {
  MONDAY = 1,
  TUESDAY = 2,
  WEDNESDAY = 3,
  THURSDAY = 4,
  FRIDAY = 5,
  SATURDAY = 6,
  SUNDAY = 0,
}

export enum RegrexEnum {
  TIME_INTERVAL = '^(0[0-9]|1[0-9]|2[0-3]):([03]0)$',
}

export enum DefaultHourEnum {
  OPEN_HOUR = '08:00',
  CLOSE_HOUR = '19:00',
}
