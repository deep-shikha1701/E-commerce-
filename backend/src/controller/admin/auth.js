const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
exports.signup = (req, res) => {
    User.findOne({ email: req.body.email })
        .exec(async (user, err) => {
            if (user) {
                return res.status(400).json({ message: "An admin account from this E-mail already exists!!" });
            }

            const {
                firstName,
                lastName,
                email,
                password
            } = req.body;
            const hash_password = await bcrypt.hash(password, 10);
            const _user = new User({
                firstName,
                lastName,
                email,
                hash_password,
                userName: Math.random().toString(),
                role: 'admin'
            });

            _user.save((error, data) => {
                if (error) {
                    return res.status(400).json({ message: "Something went wrong." });
                }

                if (data) {
                    return res.status(201).json({ message: "Admin Created successfully." });
                }
            })

        });
}

exports.signin = (req, res) => {
    User.findOne({ email: req.body.email })
        .exec((error, user) => {
            if (error) {
                return res.status(400).json({ error });
            }
            if (user) {
                if (user.authenticate(req.body.password) && user.role === 'admin') {
                    const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });
                    const { _id, firstName, lastName, email, role, fullName } = user;
                    res.cookie('token', token, { expiresIn: '1d' });
                    res.status(200).json({
                        token,
                        user: {
                            firstName, lastName, _id, email, role, fullName
                        }
                    })
                } else {
                    return res.status(400).json({
                        message: 'Authentication failed!!. Invalid password',
                    })
                }


            } else {
                return res.status(400).json({ message: "Something went Wrong!" });
            }
        })
}


exports.signout = (req, res) => {
    res.clearCookie('token');
    res.status(200).json({
        message: 'Signout Successfully!!'
    });
}