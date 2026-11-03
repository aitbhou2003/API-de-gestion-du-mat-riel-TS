import bcrypt from "bcrypt";
export const hashPass = async (password: string): Promise<string> => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    return hashPassword;
  } catch (error) {
    throw error;
  }
};

export const comparePass = async (
  password: string,
  hashPass: string,
): Promise<boolean> => {
  try {
    return (await bcrypt).compare(password, hashPass);
  } catch (error) {
    throw error;
  }
};
