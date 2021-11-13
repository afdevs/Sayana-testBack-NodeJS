
export const jwtConfig={
    expiresTime: process.env.TOKEN_EXPIRES_TIME || '8200',
    secret:  process.env.TOKEN_SECRET || 'supersecrettoken'
}