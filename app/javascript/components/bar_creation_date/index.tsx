import React from 'react';

type Props = {
  createdAt: string;
  locale: string | null;
};

type DateProps = {
  year?: string;
  month?: string;
  weekday?: string;
  day?: string;
};

const BarCreationDate: React.FC<Props> = ({ locale, createdAt }) => {
  const created = new Date(createdAt);
  const secondsAgo = Math.floor((+new Date() - +created) / 1000);
  const dateLocale = locale || 'en-US';

  const isLaterThan = {
    year: secondsAgo >= 31557600,
    week: secondsAgo >= 604800,
    day: secondsAgo >= 86400,
    hour: secondsAgo >= 3600,
    min: secondsAgo >= 60,
  };

  const localeTime = created
    .toLocaleString(dateLocale, {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    })
    .toLowerCase();
  const toLocaleDate = (options: DateProps): string =>
    created.toLocaleDateString(dateLocale, options);

  let displayTime = '';

  if (isLaterThan.year) {
    displayTime = toLocaleDate({
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }

  if (!isLaterThan.year && isLaterThan.week) {
    const date = toLocaleDate({ month: 'short', day: 'numeric' });
    displayTime = `${date} at ${localeTime}`;
  }

  if (!isLaterThan.week && isLaterThan.day) {
    const day = toLocaleDate({ weekday: 'long' });
    displayTime = `${day} at ${localeTime}`;
  }

  if (!isLaterThan.day && isLaterThan.hour) {
    displayTime = localeTime;
  }

  if (!isLaterThan.hour && isLaterThan.min) {
    const minutes = Math.floor(secondsAgo / 60);
    displayTime = `${minutes} minutes ago`;
  }

  if (!isLaterThan.min) {
    displayTime = 'just now';
  }

  return <time dateTime={createdAt}>{displayTime}</time>;
};

export default BarCreationDate;