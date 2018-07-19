import getReleases from './getReleases';

const getDateToday = () => {
  const date = new Date();
  // tslint:disable-next-line:no-magic-numbers
  return date.toISOString().slice(0, 10);
};

export default async () => {
  const today = getDateToday();
  const releasesToday = await getReleases(today);
  // tslint:disable-next-line:no-magic-numbers
  if (releasesToday >= 9) {
    return `${today}${releasesToday + 1}`;
  }
  return `${today}0${releasesToday}`;
};
