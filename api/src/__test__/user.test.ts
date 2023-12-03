import supertest from 'supertest'

import { app } from '../index'

describe('user', () => {
  describe('login user', () => {
    it('should login user successfully', async () => {
      await supertest(app)
        .post('/api/user/login')
        .send({ username: 'admin', password: 'password' })
        .expect(200)
    })

    it('should fail to login if username or password are incorrect', async () => {
      await supertest(app)
        .post('/api/user/login')
        .send({ username: 'something', password: 'wrong' })
        .expect(404)
    })

    it('should be able to logout', async () => {
      await supertest(app).get('/api/user/logout').expect(200)
    })
  })
})
