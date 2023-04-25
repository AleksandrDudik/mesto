export class UserInfo {
  constructor({ selectorUserName, selectorUserJob}) {
    this._profileName = document.querySelector(selectorUserName);
    this._profileJob = document.querySelector(selectorUserJob);
  }

  getUserInfo() {
    return {
      name: this._profileName.textContent,
      job: this._profileJob.textContent,
    }
  }

  setUserInfo({name, job}) {
    this._profileName.textContent = name;
    this._profileJob.textContent = job;
  }
}