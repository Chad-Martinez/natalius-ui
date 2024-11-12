import dayjs from 'dayjs';

export const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const WEEKS_OF_MONTH = [
  'Week 1',
  'Week 2',
  'Week 3',
  'Week 4',
  'Week 5',
];

export const MONTHS_OF_YEAR = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export const TIMEZONE_SELECT = [
  {
    _id: 'America/Los_Angeles',
    name: 'Pacific Standard Time (PST)',
  },
  {
    _id: 'America/Denver',
    name: 'Mountain Standard Time (MST)',
  },
  {
    _id: 'America/Chicago',
    name: 'Central Standard Time (CST)',
  },
  {
    _id: 'America/New_York',
    name: 'Eastern Standard Time (EST)',
  },
];

export const getUserTimezone = () => {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch (e) {
    try {
      return dayjs.tz.guess();
    } catch (e) {
      const offset = -new Date().getTimezoneOffset() / 60;
      const gmtOffset = `GMT ${offset}`;

      if (offset === -4 || offset === -5) {
        return 'America/New_York';
      } else if (offset === -5 || offset === -6) {
        return 'America/Chicago';
      } else if (offset === -6 || offset === -7) {
        return 'America/Denver';
      } else if (offset === -7 || offset === -8) {
        return 'America/Los_Angeles';
      }
      return gmtOffset;
    }
  }
};
