// create the default headers class for the various requests

class Request {
  default = () => {
    return {
      "content-type": "application/json",
      "Access-Control-Origin": "*",
    };
  };

  addAuth = (token) => {
    const headers = this.defaultHeaders();
    headers["Authorization"] = `Bearer ${token}`;
    return headers;
  };

  login = async (data = {}) => {
    const req = {
      method: "POST",
      headers: this.default(),
      body: data,
    };
    await fetch("/login/", req)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res.ok && res.token) {
          localStorage.setItem("token", res.token);
          return;
        }
      });
  };
}
const request = new Request();
module.exports = request;
