const sizify = (value) => {
  if (value === null || value === undefined) {
    return "0 B";
  }
  if (value === 0) {
    return "0 B";
  }
  const sizes = ["B", "KB", "MB", "GB", "TB", "PB"];
  let i = 0;
  while (value >= 1024 && i < sizes.length - 1) {
    value /= 1024;
    i++;
  }
  return `${value.toFixed(2)} ${sizes[i]}`;
};

export default sizify;
