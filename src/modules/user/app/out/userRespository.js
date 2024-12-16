const { userModel } = "";
const bcrypt = require('bcrypt')
class userRespository {
  async create({ name, email, password }) {
    try {
      const uid = crypto.randomUUID();
      const passwordCrypting =await bcrypt.hashSync()
      const user = await userModel.create({ uid, name, email });
      return user;
    } catch (error) {
      console.log(error);
    }
  }
  async logear(data) {}
}

module.exports = userRespository