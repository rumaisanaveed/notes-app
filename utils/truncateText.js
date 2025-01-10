export const truncateText = (text) => {
  if (text.length > 221) {
    return text.slice(0, 165) + "...";
  }
  return text;
};
