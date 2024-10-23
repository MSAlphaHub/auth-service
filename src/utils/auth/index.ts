import bcrypt from "bcrypt";

export const hashPassword = async (password: string): Promise<string> => {
  const SALT_ROUNDS = 8;
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  return await bcrypt.hash(password, salt);
};

export const comparePassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};
