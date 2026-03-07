import Cookies from "js-cookie";

export const EnumTokens = {
  ACCESS_TOKEN: "accessToken",
  REFRESH_TOKEN: "refreshtoken",
} as const;

export const getAccessToken = () => {
  const accessToken = Cookies.get(EnumTokens.ACCESS_TOKEN);
  return accessToken || null;
};

export const saveTokenStorage = (accessToken: string) => {
  //TODO: .env prod dev like on backend
  const isProduction = process.env.NODE_ENV === "production";
  Cookies.set(EnumTokens.ACCESS_TOKEN, accessToken, {
    sameSite: "strict",
    secure: isProduction,
    expires: 1,
  });
};

export const removeFromStorage = () => {
  Cookies.remove(EnumTokens.ACCESS_TOKEN);
};
