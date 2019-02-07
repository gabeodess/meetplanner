// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
const formatDate = (string, options) => {
  const opts = options || {
    month: 'short',
    day: '2-digit',
  };
  opts.timeZone = opts.timeZone || 'UTC';
  return new Intl.DateTimeFormat('en-US', opts).format(Date.parse(string));
};

export const formatTime = string => new Intl.DateTimeFormat('en-US', { timeZone: 'UTC', hour: 'numeric', minute: '2-digit' }).format(Date.parse(string));

export default formatDate;
