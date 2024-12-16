
const {Sequelize} = 'sequelize'

const sequelize = new Sequelize(
    process.env.DATABASE_URL || 
    "postgres://nicol:nicol2006@localhost:5432/proyect-chat",{
        dialect:"postgres",
        logging:"false",
    }
);

const models = {};
models.User = UserModel(sequelize);
models.Conversation = ConversationModel(sequelize);
models.Message = MessageModel(sequelize);
models.FriendsRequest = FriendsRequestModel(sequelize);

Object.keys(models).forEach((modelName) => {
    if(models[modelName].associate){
        models[modelName].associate(models)
    }
});

sequelize
.async()
.then(()=> console.log("Base de datos sincronizada correctamente"))
.catch((error)=>
console.log("Error al sincronizar la base de datos", error));

module.exports = {...models, sequelize}