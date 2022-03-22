const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    name: {
      type: String,
    },
    username: {
      type: String,
      min: 3,
      max: 50,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      max: 100,
    },
    password: {
      type: String,
      min: 4,
    },
    profilePicture: {
      type: String,
      default: '',
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    social: {
      googleProvider: {
        id: String,
        token: String,
      },
    },
  },
  {
    timestamps: true,
  }
);

// Model Methods
userSchema.methods.generateJWT = function () {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);

  return jwt.sign(
    {
      email: this.email,
      id: this._id,
      exp: parseInt(expirationDate.getTime() / 1000, 10),
    },
    'secret'
  );
};

userSchema.statics.upsertGoogleUser = async function ({
  accessToken,
  refreshToken,
  profile,
}) {
  const User = this;

  const user = await User.findOne({ 'social.googleProvider.id': profile.id });

  // no user was found, lets create a new one
  if (!user) {
    const newUser = await User.create({
      name: profile.displayName || `${profile.familyName} ${profile.givenName}`,
      email: profile.emails[0].value,
      'social.googleProvider': {
        id: profile.id,
        token: accessToken,
      },
    });

    return newUser;
  }
  return user;
};

module.exports = mongoose.model('User', userSchema);
