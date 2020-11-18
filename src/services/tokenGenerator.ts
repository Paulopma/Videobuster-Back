import * as jwt from "jsonwebtoken"

var redis = require('redis');
var JWTR =  require('jwt-redis').default;
var redisClient = redis.createClient();
var jwtr = new JWTR(redisClient);

export class TokenGenerator {
  private static expiresIn = process.env.JWT_EXPIRES_IN
  
  public async generate (input: AuthenticationData): Promise<string> {
    const newToken = await jwtr.sign(
      {
        id: input.id,
        jti: input.id
      },
      process.env.JWT_KEY as string,
      {
        expiresIn: TokenGenerator.expiresIn,
      }
    )
    return newToken
  }

  public async verify(token: string): Promise<string> {
    try {
      const payload = await jwtr.verify(token, process.env.JWT_KEY as string) as any
      const result = payload.id
      return result
    } catch (error) {
      throw new Error('invalid token');
    }
  }

  public async destroy(tokenId: string) {
    await jwtr.destroy(tokenId)
  }
}

export interface AuthenticationData {
  id: string
}