/* eslint-disable promise/param-names */
import { sign, verify } from 'jsonwebtoken';
const { EXPIRES_IN, JWT_SECRET  } = process.env;


export const signToken = (data: {id: string}, time?: string) => {
    return sign(data, JWT_SECRET, {
      expiresIn: time == "" || !time ? EXPIRES_IN : time,
    });
  };
  
  export const retrieveTokenValue = async <T>(token: string): Promise<T & { iat: number }> => {
    return new Promise<T & { iat: number }>((res, rej) =>
      verify(token, JWT_SECRET, (err, value: unknown) => {
        if (err) return rej(err);
        res(value as T & { iat: number });
      })
    );
  };

