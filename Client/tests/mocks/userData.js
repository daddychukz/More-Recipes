
const userData = {

  decodedToken: {
    username: 'username',
    userId: '8e48ff30-cb3c-462b-a8eb-fa476095c099',
    fullname: 'Adam Eve',
    imageUrl: 'https://res.cloudinary.com/chuks-andela32/image/upload/v1510027347/user-male_jvc8hn.jpg',
    publicUrl: 'user-male_jvc8hn.jpg',
    iat: 1518017421,
    exp: 1518103821
  },

  signupRequest: {
    fullname: 'Adam Eve',
    email: 'example@example.com',
    username: 'username',
    password: 'password',
  },

  signupResponse: {
    Message: 'User created successfully',
    User: {
      fullname: 'Adam Eve',
      username: 'username',
      email: 'example@example.com',
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXJu' +
      'YW1lIiwidXNlcklkIjoiOGU0OGZmMzAtY2IzYy00NjJiLWE4ZWItZmE0NzYwOTVjMDk5Ii' +
      'wiZnVsbG5hbWUiOiJBZGFtIEV2ZSIsImltYWdlVXJsIjoiaHR0cHM6Ly9yZXMuY2xvdWRp' +
      'bmFyeS5jb20vY2h1a3MtYW5kZWxhMzIvaW1hZ2UvdXBsb2FkL3YxNTEwMDI3MzQ3L3VzZ' +
      'XItbWFsZV9qdmM4aG4uanBnIiwicHVibGljVXJsIjoidXNlci1tYWxlX2p2Yzhobi5qcG' +
      'ciLCJpYXQiOjE1MTgwMTc0MjEsImV4cCI6MTUxODEwMzgyMX0.XzIn3063Y4jlbSZqLqRk' +
      'wHKAIHiG-zqxt1y2_3MgphI'
    }
  },

  signinRequest: {
    Email: 'example@example.com',
    Password: 'password',
  },

  signinResponse: {
    Email: 'example@example.com',
    Password: 'password'
  },

  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXJu' +
  'YW1lIiwidXNlcklkIjoiOGU0OGZmMzAtY2IzYy00NjJiLWE4ZWItZmE0NzYwOTVjMDk5Ii' +
  'wiZnVsbG5hbWUiOiJBZGFtIEV2ZSIsImltYWdlVXJsIjoiaHR0cHM6Ly9yZXMuY2xvdWRp' +
  'bmFyeS5jb20vY2h1a3MtYW5kZWxhMzIvaW1hZ2UvdXBsb2FkL3YxNTEwMDI3MzQ3L3VzZ' +
  'XItbWFsZV9qdmM4aG4uanBnIiwicHVibGljVXJsIjoidXNlci1tYWxlX2p2Yzhobi5qcG' +
  'ciLCJpYXQiOjE1MTgwMTc0MjEsImV4cCI6MTUxODEwMzgyMX0.XzIn3063Y4jlbSZqLqRk' +
  'wHKAIHiG-zqxt1y2_3MgphI',

  userProfile: {
    userId: '8e48ff30-cb3c-462b-a8eb-fa476095c099',
    fullname: 'Adam Eve',
    email: 'example@example.com',
    sex: null,
    username: 'username',
    address: 'Nil',
    about: 'Nil',
    hobbies: 'Nil',
    phone: 0,
    imageUrl: 'https://res.cloudinary.com/chuks-andela32/image/upload/v1510027347/user-male_jvc8hn.jpg',
    publicUrl: 'user-male_jvc8hn.jpg'
  },

  updateProfileRequest: {
    FullName: 'Chuks',
    Address: 'Lagos'
  },

  updatedProfileResponse: {
    userId: '8e48ff30-cb3c-462b-a8eb-fa476095c099',
    fullname: 'Adam Eve',
    email: 'example@example.com',
    sex: null,
    username: 'Chuks',
    address: 'Lagos',
    about: 'Nil',
    hobbies: 'Nil',
    phone: 0,
    imageUrl: 'https://res.cloudinary.com/chuks-andela32/image/upload/v1510027347/user-male_jvc8hn.jpg',
    publicUrl: 'user-male_jvc8hn.jpg'
  },

  resetPasswordRequest: {
    Password: 'password2',
    UserId: '8e48ff30-cb3c-462b-a8eb-fa476095c099'
  }

};

export default userData;
