import Avatar from '../models/AvatarExercicios';

class FileController {
  async store(req, res) {
    // desestruturar para pegar alguns campos de req.file
    const { originalname: nome, filename: local } = req.file;

    const file = await Avatar.create({
      nome,
      local,
    });

    return res.json(file);
  }
}

export default new FileController();
