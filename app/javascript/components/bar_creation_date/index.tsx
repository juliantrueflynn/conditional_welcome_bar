import React from 'react';

type Props = {
  createdAt: string;
  locale: string;
};

type DateProps = {
  year?: string;
  month?: string;
  weekday?: string;
  day?: string;
};

type LocaleDateString = (options: DateProps) => string;

const getMinutesAgotext = (secondsAgo: number): string => {
  const minutes = Math.floor(secondsAgo / 60);
  const pluralized = minutes === 1 ? 'minute' : 'minutes';

  return `${minutes} ${pluralized} ago`;
};

const getTimeAgo = (
  toLocaleDate: LocaleDateString,
  localeTime: string,
  secondsAgo: number
): string => {
  const isLaterThan = {
    year: secondsAgo >= 31557600,
    week: secondsAgo >= 604800,
    day: secondsAgo >= 86400,
    hour: secondsAgo >= 3600,
    min: secondsAgo >= 60,
  };

  let ago = 'Just now';

  if (isLaterThan.year) {
    ago = toLocaleDate({ year: 'numeric', month: 'short', day: 'numeric' });
  } else if (isLaterThan.week) {
    const week = toLocaleDate({ month: 'short', day: 'numeric' });
    ago = `${week} at ${localeTime}`;
  } else if (isLaterThan.day) {
    ago = `${toLocaleDate({ weekday: 'long' })} at ${localeTime}`;
  } else if (isLaterThan.hour) {
    ago = localeTime;
  } else if (isLaterThan.min) {
    ago = getMinutesAgotext(secondsAgo);
  }

  return ago;
};

const BarCreationDate = ({ locale, createdAt }: Props) => {
  const created = new Date(createdAt);
  const secondsAgo = Math.floor((+new Date() - +created) / 1000);

  const toLocaleDate: LocaleDateString = (options) =>
    created.toLocaleDateString(locale, options);

  const localeTime = created
    .toLocaleString(locale, {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    })
    .toLowerCase();
  const displayTime = getTimeAgo(toLocaleDate, localeTime, secondsAgo);

  return <time dateTime={createdAt}>{displayTime}</time>;
};

export default BarCreationDate;
