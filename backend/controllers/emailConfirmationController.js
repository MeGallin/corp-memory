import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';

// @description: Confirmation Email
// @route: GET /api/confirm/token=id
// @access: public
const confirmEmail = asyncHandler(async (req, res) => {
  // const token = req.params.id;
  const decodedToken = jwt.verify(
    req.params.id,
    process.env.JWT_SECRET,
    function (err, decoded) {
      return decoded.id;
    },
  );

  const user = await User.findById(decodedToken);

  if (user) {
    user.isConfirmed = true;
    await user.save();
    if (process.env.NODE_ENV === 'production') {
      return res.redirect('http://www.yourcorporatememory.com/');
    } else {
      return res.status(200).send({ message: 'Account Verified' });
    }
  } else {
    res.status(404);
    throw new Error('No user found');
  }
});

export { confirmEmail };
