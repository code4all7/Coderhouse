const sharp = require('sharp')
const path = require('path')
const UserDto = require('../dtos/user-dto')
const userService = require('../services/user-service')

class ActivateController {
  async activate(req, res) {
    //   logic
    const { name, avatar } = req.body

    if (!name || !avatar) {
      res.json(400).json({ message: 'All fields are required' })
    }
    const buffer = Buffer.from(
      avatar.replace(/^data:image\/(png|jpg|jpeg);base64,/, ''),
      'base64'
    )

    const imagePath = `${Date.now()}-${Math.round(Math.random() * 1e9)}.png`

    try {
      const sharpImage = await sharp(buffer)
      sharpImage.resize(200).toFile(`storage/${imagePath}`)
    } catch (err) {
      res.status(500).json({ message: `Could not process the image: ${err}` })
    }

    const userId = req.user._id
    // update user
    try {
      const user = await userService.findUser({ _id: userId })
      if (!user) {
        res.status(404).json({ message: 'User not found' })
      }
      user.activated = true
      user.name = name
      user.avatar = `/storage/${imagePath}`
      user.save()
      res.json({ user: new UserDto(user), auth: true })
    } catch (err) {
      res.status(500).json({ message: 'Something went wrong' })
    }
  }
}

module.exports = new ActivateController()
