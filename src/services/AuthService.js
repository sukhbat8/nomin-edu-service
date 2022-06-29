import { postRequest, getRequest } from "./ApiService";

class AuthService {
  login = async (body) => {
    const res = await postRequest("/auth/login", body);
    return res;
  };

  registerWithLogin = async (body) => {
    const res = await postRequest("/auth/loginWithRegister", body);
    return res;
  };

  changeToken = async (orgId) => {
    let url = `/auth/changeToken`;
    if (orgId) {
      url += `?orgId=${orgId}`;
    }
    const res = await getRequest(url);
    return res;
  };
}

export default new AuthService();