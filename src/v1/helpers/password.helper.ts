import * as bcrypt from 'bcryptjs'; 
const {SALT_ROUNDS} = process.env// Change the import statement

class PinHelper {
  public async compare(
    plainPassword: string,
    hashPassword: string
  ): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashPassword);
  }

  public async hashPassword(plainPassword: string) {
    return await bcrypt.hash(plainPassword, Number(SALT_ROUNDS));
  }

  public async generate() {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const passwordLength = 7;
    let password = '';
    for (let i = 0; i < passwordLength; i++) { // Fix the loop condition
      const randomNumber = Math.floor(Math.random() * chars.length);
      password += chars.substring(randomNumber, randomNumber + 1);
    }
    return password;
  }
}

export default PinHelper;
