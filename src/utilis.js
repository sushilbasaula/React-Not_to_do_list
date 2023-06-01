const length = 6;
const str = "qwertyuioplkjhgfdsazxcvbnmQWERTYUIOPLKJHGFDSAZXCVBNM";

export const randomStr = () => {
  let _id = "";

  for (let i = 0; i < length; i++) {
    _id += str[Math.floor(Math.random() * str.length)];
    // str[5];
  }

  return _id;
};
