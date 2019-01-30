const formatDate = (string, options) => {
  const opts = options || {
    month: 'short',
    day: '2-digit',
  };
  opts.timeZone = opts.timeZone || 'UTC';
  return new Intl.DateTimeFormat('en-US', opts).format(Date.parse(string));
};

export default formatDate;
