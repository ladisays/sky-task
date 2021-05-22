const formatter = (time) => {
  let result = "";
  const hours = Math.floor(time / 60);
  const minutes = time % 60;

  if (hours) {
    result = `${hours}h`;
  }

  result += ` ${minutes}m`;
  return result.trim();
};

export default formatter;
