import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/login', 'AuthController.login').as("login")

  Route.post('/register', 'AuthController.register').as("register")

  Route.post('/code/send', 'AuthController.code').as("code.send")

  Route.post('/code/verify', 'AuthController.verify').as("code.verify")

  Route.post('/logout', 'AuthController.logout').as("logout")

  Route.get('/sign/:id', ({ params }) => {
    return Route.makeSignedUrl('auth.verify', {
      id: params.id,
    }, {
      expiresIn: '30s'
    })
  }).as('sign')


  Route.get('/verify', async ({ request }) => {
    if (request.hasValidSignature()) {
      return 'signature is valid'
    }
    return 'signature is invalid'
  }).as('verify')

}).prefix("/auth").as("auth")
