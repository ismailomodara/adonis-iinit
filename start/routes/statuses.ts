import Route from '@ioc:Adonis/Core/Route'

Route.get('/statuses', 'StatusesController.index').as("statuses.index");
