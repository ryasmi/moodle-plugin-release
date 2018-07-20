import getReleases from './getReleases';

const getDateToday = () => {
  const date = new Date();
  // tslint:disable-next-line:no-magic-numbers
  return date.toISOString().slice(0, 10);
};

export default async () => {
  const today = getDateToday();
  const releasesToday = await getReleases(today);
  const todayString = today.replace(/\-/g, '');
  // tslint:disable-next-line:no-magic-numbers
  if (releasesToday >= 9) {
    return `${todayString}${releasesToday + 1}`;
  }
  return `${todayString}0${releasesToday}`;
};
