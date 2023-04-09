const knex = require("../database");

module.exports = {
  async createLeague(req, res, next) {
    try {
      await knex("league").insert(req.body);
      return res.status(201).send();
    } catch (error) {
      next(error);
    }
  },

  async editLeague(req, res, next) {
    try {
      await knex("league").update(req.body).where(req.params);
      return res.json();
    } catch (error) {
      next(error);
    }
  },

  async getLeague(req, res, next) {
    try {
      const result = await knex("league").where(req.params);
      return res.json(result);
    } catch (error) {
      next(error);
    }
  },

  async getAllLeagues(req, res, next) {
    try {
      const result = await knex("league").where(req.params);
      return res.json(result);
    } catch (error) {
      next(error);
    }
  },

  async deleteLeague(req, res, next) {
    try {
      await knex("league").where(req.params).delete();
      return res.json();
    } catch (error) {
      next(error);
    }
  },
};
