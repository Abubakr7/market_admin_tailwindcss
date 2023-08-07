import jwt_decode from "jwt-decode";

interface ITokenType {
  email: string;
  exp: number;
  iat: number;
  sub: string;
}

function saveToken(token: string) {
  localStorage.setItem("access_token", token);
}

function destroyToken() {
  localStorage.removeItem("access_token");
  window.location.pathname = "/";
}

function isValidToken(): boolean {
  const token = getToken() as ITokenType;

  if (token?.exp) {
    if (token?.exp * 1000 < Date.now()) {
      return true;
    }
  }

  return false;
}

function getToken() {
  try {
    const token: string | null = localStorage.getItem("access_token");
    if (token) {
      return jwt_decode(token);
    }
  } catch (error) {
    console.log(error);
  }
}

export { saveToken, destroyToken, getToken, isValidToken };
