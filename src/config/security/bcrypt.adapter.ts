import { compareSync, genSaltSync, hashSync } from "bcrypt";

export const bcryptAdapter = {
  compare: (password: string, hashedPassword: string) => {
    return compareSync(password, hashedPassword);
  },
  hash: (password: string) => {
    const salt = genSaltSync(10);
    return hashSync(password, salt);
  },
};
