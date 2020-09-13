import React from 'react';
import {screen, render} from '@testing-library/react';
import ResourceCreationTime from '../resource_creation_time';

const locale = 'en-US';
const mockCreatedAt = new Date().toString();

const GREATER_THAN_1_YEAR_IN_SECONDS = 31557600 + 5;
const GREATER_THAN_1_WEEK_IN_SECONDS = 604800 + 5;
const GREATER_THAN_1_DAY_IN_SECONDS = 86400 + 5;
const GREATER_THAN_1_HOUR_IN_SECONDS = 3600 + 5;
const GREATER_THAN_1_MIN_IN_SECONDS = 60 + 5;

const mockSecondsAgo = (seconds: number) => {
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
  render(<ResourceCreationTime createdAt={mockCreatedAt} locale={locale} />);

  expect(screen.getByText('Just now')).toBeInTheDocument();
});

it('renders "1 minute ago" if over a minute and under an hour', () => {
  mockSecondsAgo(GREATER_THAN_1_MIN_IN_SECONDS);
  render(<ResourceCreationTime createdAt={mockCreatedAt} locale={locale} />);

  expect(screen.getByText('1 minute ago')).toBeInTheDocument();
});

it('pluralizes minutes if over one', () => {
  mockSecondsAgo(GREATER_THAN_1_MIN_IN_SECONDS * 2);
  render(<ResourceCreationTime createdAt={mockCreatedAt} locale={locale} />);

  expect(screen.getByText('2 minutes ago')).toBeInTheDocument();
});

it('renders AM/PM time if over 1 hour and within the day', () => {
  const time = getMockedTimeString();
  mockSecondsAgo(GREATER_THAN_1_HOUR_IN_SECONDS);
  render(<ResourceCreationTime createdAt={mockCreatedAt} locale={locale} />);

  expect(screen.getByText(time)).toBeInTheDocument();
});

it('renders "{DayName} at {AM/PM time}" if greater current day and within week', () => {
  const time = getMockedTimeString();
  const weekday = new Date().toLocaleString(locale, {weekday: 'long'});
  mockSecondsAgo(GREATER_THAN_1_DAY_IN_SECONDS);
  render(<ResourceCreationTime createdAt={mockCreatedAt} locale={locale} />);

  expect(screen.getByText(`${weekday} at ${time}`)).toBeInTheDocument();
});

it('renders "{ShortMonthName} {DayNumber} at {AM/PM time}" if greater than week and within 1 year', () => {
  const time = getMockedTimeString();
  const date = new Date().toLocaleString(locale, {
    month: 'short',
    day: 'numeric',
  });
  mockSecondsAgo(GREATER_THAN_1_WEEK_IN_SECONDS);
  render(<ResourceCreationTime createdAt={mockCreatedAt} locale={locale} />);

  expect(screen.getByText(`${date} at ${time}`)).toBeInTheDocument();
});

it('renders "{ShortMonthName} {DayNumber}, {Year}" if greater than 1 year', () => {
  const date = new Date().toLocaleString(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
  mockSecondsAgo(GREATER_THAN_1_YEAR_IN_SECONDS);
  render(<ResourceCreationTime createdAt={mockCreatedAt} locale={locale} />);

  expect(screen.getByText(date)).toBeInTheDocument();
});
