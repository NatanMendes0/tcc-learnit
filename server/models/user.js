const moongose = require("mongoose");

const UserSchema = new moongose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    require: true,
  },
  nickname: {
    type: String,
    required: true,
    unique: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  role: {
    type: String,
  },
});

// Função de pré-salvamento (pre-save hook)
UserSchema.pre("save", function (next) {
  // Remover espaços em branco do início e do fim da string
  this.nickname = this.nickname.trim();

  // Juntar todas as palavras em uma única string (sem espaços entre elas)
  this.nickname = this.nickname.replace(/\s+/g, "");

  next();
});

module.exports = moongose.model("user", UserSchema);
