const generateToken = () => {
  let token = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789';

  for (let i = 0; i < 14; i++) {
    token += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return token;
}

export {generateToken}