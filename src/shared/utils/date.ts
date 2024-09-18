export default function formatDate(date: Date) {
  const originDate = new Date(date);

  const formatter = new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'Asia/Seoul',
  });
  const formattedDateParts = formatter.formatToParts(originDate);

  const year = formattedDateParts.find((part) => part.type === 'year')?.value;
  const month = formattedDateParts.find((part) => part.type === 'month')?.value;
  const day = formattedDateParts.find((part) => part.type === 'day')?.value;
  const hour = formattedDateParts.find((part) => part.type === 'hour')?.value;
  const minute = formattedDateParts.find(
    (part) => part.type === 'minute'
  )?.value;

  return `${year}-${month}-${day} ${hour}:${minute}`;
}
