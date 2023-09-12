import Route from '@ioc:Adonis/Core/Route'

Route.get('/roles', 'RolesController.index').as("roles.index");
