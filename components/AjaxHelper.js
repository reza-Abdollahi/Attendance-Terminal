// https://github.com/axios/axios
import axios from 'axios';

export default class AjaxHelper {

  static async getLoginId(username, password){
      const logonUrl = `https://users.sepanta.com/api/authentication/LogOnToken?username=${username}&password=${password}`;

      const authCookieValue = await axios.get(logonUrl)
          .then(res =>  res.data )
          .catch(function (error) { console.warn(error); });
      return authCookieValue;
  }

  static initialize(authCookieValue){
      if (!authCookieValue)
        return;

      const authCookie = `cuma2=${authCookieValue}`;
      AjaxHelper.instance = axios.create({
        baseURL: 'https://attendance.sepanta.com/',
        headers: { Cookie: authCookie },
      });
      AjaxHelper.instance.authCookieValue = authCookie;
  }

  static isInitialized(){
    return AjaxHelper.instance &&
      AjaxHelper.instance.authCookieValue !== undefined;
  }

}
