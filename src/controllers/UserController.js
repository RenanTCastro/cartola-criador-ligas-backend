const knex = require("../database");
const bcrypt = require("bcrypt");
const generateJwt = require("../utils/jwt");

module.exports = {
  async register(req, res, next) {
    try {
      req.body.password = bcrypt.hashSync(req.body.password, 10);

      // Cria o código do usuário
      const min = 100000;
      const max = 999999;
      let code, user;

      do {
        code = Math.floor(Math.random() * (max - min + 1)) + min;
        user = await knex("user").where({ user_code: code }).first();
      } while (user);

      // Verifica se o usuário já existe com esse e-mail
      const newEmail = await knex("user").where({ email: req.body.email });

      if (!newEmail.length) {
        await knex("user").insert({ user_code: code, credits: 0, ...req.body });
        return res.status(201).send();
      } else {
        return res.status(401).send({ error: "E-mail já cadastrado" });
      }
    } catch (error) {
      next(error);
    }
  },

  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const user = await knex("user").where({ email: email });

      if (!(email && password)) {
        res.status(400).send({ error: "É necessário preencher todos campos" });
      }

      if (!user.length) {
        res.status(401).json({ error: "E-mail não existe" });
      } else {
        const isAuthenticated = bcrypt.compareSync(password, user[0].password);

        if (!isAuthenticated) {
          res.status(401).json({ error: "Senha incorreta" });
        } else {
          const token = await generateJwt.generateJwt({
            user_id: user[0].user_id,
          });
          res.send({
            token: token,
            user_id: user[0].user_id,
          });
        }
      }
    } catch (error) {
      next(error);
    }
  },

  async resetPassword(req, res, next) {
    try {
      req.body.password = bcrypt.hashSync(req.body.password, 10);
      await knex("user").update(req.body).where(req.params);
      return res.status(201).send();
    } catch (error) {
      next(error);
    }
  },

  async getInfo(req, res, next) {
    try {
      const user = await knex("user").where(req.params);
      const { credits, user_code } = user[0];
      const result = { credits, user_code };
      return res.json(result);
    } catch (error) {
      next(error);
    }
  },

  async deleteUser(req, res, next) {
    try {
      const user = await knex("user").del().where(req.params);
      return res.status(201).send();
    } catch (error) {
      next(error);
    }
  },
};
