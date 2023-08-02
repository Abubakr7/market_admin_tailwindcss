import jwt_decode from "jwt-decode";

function saveToken(token: string) {
  localStorage.setItem("access_token", token);
}

function destroyToken() {
  localStorage.removeItem("access_token");
  window.location.pathname = "/";
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

export { saveToken, destroyToken, getToken };
