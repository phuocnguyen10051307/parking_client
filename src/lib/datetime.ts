const VIETNAM_DATE_TIME_FORMATTER = new Intl.DateTimeFormat('en-US', {
  timeZone: 'Asia/Ho_Chi_Minh',
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  hour: 'numeric',
  minute: '2-digit',
  second: '2-digit',
  hour12: true,
});

export const formatDateTimeVietnam = (value?: string) => {
  if (!value) {
    return '--';
  }

  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? value : VIETNAM_DATE_TIME_FORMATTER.format(parsed);
};
