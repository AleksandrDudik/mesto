export default class UserInfo {
  constructor({ selectorUserName, selectorUserJob}) {
    this._profileName = selectorUserName;
    this._profileJob = selectorUserJob;
  }

  getUserInfo() {
    const data = {
      name: this._profileName.textContent,
      job: this._profileJob.textContent,
    };
    return data;
  }

  setUserInfo(data) {
    this._profileName.textContent = data.name;
    this._profileJob.textContent = data.job;
  }
}