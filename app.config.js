const env = Object.fromEntries(
  Object.entries(process.env).filter(([key]) => key.startsWith("EXPO_PUBLIC_"))
);

export default ({ config }) => ({
  ...config,
  // ...
  extra: { env },
});
