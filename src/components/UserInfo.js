export default class UserInfo {
  constructor({ selectorUserName, selectorUserJob, selectorUserAvatar}) {
    this._profileName = selectorUserName;
    this._profileJob = selectorUserJob;
    this._profileAvatar = selectorUserAvatar;
  }

  getUserInfo() {
    const data = {
      name: this._profileName.textContent,
      about: this._profileJob.textContent,
    };
    return data;
  }

  setUserInfo(data) {
    this._profileName.textContent = data.name;
    this._profileJob.textContent = data.about;
    this.setUserAvatar(data);
  }

  setUserAvatar(data) {
    this._profileAvatar.src = data.avatar;
  }
}