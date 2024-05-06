export function getComplete(num: number): string {
  return num < 10 ? '0' + num : num.toString();
}

export default function GetCurrentDate(): string {
  const raw_date = new Date(),
  year = raw_date.getFullYear(),
  month = raw_date.getMonth(),
  day = raw_date.getDate(),
  hours = raw_date.getHours(),
  minutes = raw_date.getMinutes(),
  seconds = raw_date.getSeconds();

  const big = `${year}-${getComplete(month)}-${getComplete(day)}`;
  const small = `${getComplete(hours)}:${getComplete(minutes)}:${getComplete(seconds)}`;
  return big + ' ' + small;
}
