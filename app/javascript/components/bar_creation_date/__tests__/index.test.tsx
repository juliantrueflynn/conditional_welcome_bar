import React from 'react';
import { render } from '@testing-library/react';
import BarCreationDate from '..';

const locale = 'en-US';
const mockCreatedAt = new Date().toString();

const GREATER_THAN_1_YEAR_IN_SECONDS = 31557600 + 5;
const GREATER_THAN_1_WEEK_IN_SECONDS = 604800 + 5;
const GREATER_THAN_1_DAY_IN_SECONDS = 86400 + 5;
const GREATER_THAN_1_HOUR_IN_SECONDS = 3600 + 5;
const GREATER_THAN_1_MIN_IN_SECONDS = 60 + 5;

const mockSecondsAgo = (seconds: number): void => {
  jest.spyOn(global.Math, 'floor').mockReturnValueOnce(seconds);
};
const getMockedTimeString = () =>
  new Date()
    .toLocaleString(locale, {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    })
    .toLowerCase();

it('renders "Just now" if under a minute', () => {
  mockSecondsAgo(1);
  const { getByText } = render(
    <BarCreationDate createdAt={mockCreatedAt} locale={locale} />
  );

  const result = getByText('Just now');

  expect(result).not.toBeNull();
});

it('renders "1 minute ago" if over a minute and under an hour', () => {
  mockSecondsAgo(GREATER_THAN_1_MIN_IN_SECONDS);
  const { getByText } = render(
    <BarCreationDate createdAt={mockCreatedAt} locale={locale} />
  );

  const result = getByText('1 minute ago');

  expect(result).not.toBeNull();
});

it('pluralizes minutes if over one', () => {
  mockSecondsAgo(GREATER_THAN_1_MIN_IN_SECONDS * 2);
  const { getByText } = render(
    <BarCreationDate createdAt={mockCreatedAt} locale={locale} />
  );

  const result = getByText('2 minutes ago');

  expect(result).not.toBeNull();
});

it('renders AM/PM time if over 1 hour and within the day', () => {
  const time = getMockedTimeString();
  mockSecondsAgo(GREATER_THAN_1_HOUR_IN_SECONDS);
  const { getByText } = render(
    <BarCreationDate createdAt={mockCreatedAt} locale={locale} />
  );

  const result = getByText(time);

  expect(result).not.toBeNull();
});

it('renders "{DayName} at {AM/PM time}" if greater current day and within week', () => {
  const time = getMockedTimeString();
  const weekday = new Date().toLocaleString(locale, { weekday: 'long' });
  mockSecondsAgo(GREATER_THAN_1_DAY_IN_SECONDS);
  const { getByText } = render(
    <BarCreationDate createdAt={mockCreatedAt} locale={locale} />
  );

  const result = getByText(`${weekday} at ${time}`);

  expect(result).not.toBeNull();
});

it('renders "{ShortMonthName} {DayNumber} at {AM/PM time}" if greater than week and within 1 year', () => {
  const time = getMockedTimeString();
  const date = new Date().toLocaleString(locale, {
    month: 'short',
    day: 'numeric',
  });
  mockSecondsAgo(GREATER_THAN_1_WEEK_IN_SECONDS);
  const { getByText } = render(
    <BarCreationDate createdAt={mockCreatedAt} locale={locale} />
  );

  const result = getByText(`${date} at ${time}`);

  expect(result).not.toBeNull();
});

it('renders "{ShortMonthName} {DayNumber}, {Year}" if greater than 1 year', () => {
  const date = new Date().toLocaleString(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
  mockSecondsAgo(GREATER_THAN_1_YEAR_IN_SECONDS);
  const { getByText } = render(
    <BarCreationDate createdAt={mockCreatedAt} locale={locale} />
  );

  const result = getByText(date);

  expect(result).not.toBeNull();
});