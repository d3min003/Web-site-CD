import jwt from 'jsonwebtoken'

const SECRET = process.env.AUTH_SECRET || 'dev_secret_change_me'

export function sign(payload: object, opts?: jwt.SignOptions){
  return jwt.sign(payload, SECRET, {...opts, expiresIn: '8h'})
}

export function verify(token: string){
  try{
    return jwt.verify(token, SECRET)
  }catch(e){
    return null
  }
}
