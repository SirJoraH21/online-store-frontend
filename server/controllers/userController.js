class UserController {
  async registration(req, res) {

  }

  async login(req, res) {

  }

  async check(req, res) {
    const { query } = req;

    res.json(query);
  }
}

module.exports = new UserController();
