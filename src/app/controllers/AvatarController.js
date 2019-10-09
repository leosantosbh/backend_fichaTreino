import Avatar from '../models/Avatar';
import Users from '../models/Users';

class FileController {
  async store(req, res) {
    // desestruturar para pegar alguns campos de req.file
    const { originalname: nome, filename: local } = req.file;

    const file = await Avatar.create({
      nome,
      local,
    });

    const user = await Users.findByPk(req.userId);

    await user.update({
      avatar_id: file.id,
    });

    return res.json(file);
  }
}

export default new FileController();
