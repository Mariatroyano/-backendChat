const bcrypt = require("bcrypt");
const { User } = require("../../../../infraestructure/config/dataBase");
const { SALT_ROUNDS } = require("../../../../infraestructure/config/config");
const generateToken = require("../../../../infraestructure/utils/generateToken");
class UserRepository {
  async create(data) {
    const user = await User.findOne({ where: { name: data.name } });
    if (user) {
      throw new Error("the user already exists");
    }
    const passwordBcrypt = await bcrypt.hash(data.password, SALT_ROUNDS);
    let uid = crypto.randomUUID();
    const usuario = await User.create({
      uid,
      name: data.name,
      password: passwordBcrypt,
      email: data.email,
    });
    const token = generateToken(usuario["dataValues"], `${data.time}m`);
    return token;
  }
  async login(email, password, time) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error("the user does not exist");
    }
    const passwordVerified = await bcrypt.compare(password, user.password);
    if (!passwordVerified) {
      throw new Error("the password is incorrect");
    }
    // const token = this.newService.generar(user.uid, time);
    const token = generateToken(user, `${time}m`);
    return token;
  }
  async getAll() {
    const users = await User.findAll();
    return users;
  }
  async veryfyUserExist(nameV, emailV) {
    const name = await User.findOne({ where: { name: nameV } });
    const email = await User.findOne({ where: { email: emailV } });
    return {
      name: name ? true : false,
      email: email ? true : false,
    };
  }
  async getFriends(uid) {
    const user = await User.findOne({ where: { uid } });
    if (!user) {
      throw new Error("the user does not exist");
    }
    const friends = user.friends;
    if (!friends) return [];
    const allFriends = await Promise.all(
      friends?.map(async (friends) => {
        const friend = await User.findOne({ where: { uid: friends.friend } });
        return {
          name: friend.name,
          email: friend.email,
          uid: friend.uid,
        };
      })
    );
    return allFriends;
  }
  async getByUid(uid) {
    const user = await User.findOne({ where: { uid } });
    if (!user) {
      throw new Error("the user does not exist");
    }
    return {
      name: user.name,
      email: user.email,
      uid: user.uid,
    };
  }
}

module.exports = UserRepository;
