// https://github.com/axios/axios
import axios from 'axios';

export default class AjaxHelper {

  static async initialize(username, password){
      if (AjaxHelper.isInitialized())
        return;

      const logonUrl = `https://users.sepanta.com/api/authentication/LogOnToken?username=${username}&password=${password}`;

      const authCookieValue = await axios.get(logonUrl)
          .then(res => { return `cuma2=${res.data};` })
          .catch(function (error) { console.warn(error); });;

      AjaxHelper.instance = axios.create({
        headers: { Cookie: authCookieValue },
      });
      AjaxHelper.instance.authCookieValue = authCookieValue;
  }

  static isInitialized(){
    return AjaxHelper.instance &&
      AjaxHelper.instance.authCookieValue !== undefined;
  }

}
