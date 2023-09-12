import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('', 'BranchesController.index').as("index")

  Route.get('/:id', 'BranchesController.show').as('show')

  Route.post('/', 'BranchesController.store').as('store')

  Route.put('/:id', 'BranchesController.update').as('update')

  Route.delete('/:id', 'BranchesController.destroy').as('destroy')

}).prefix("/branches").as("branches")
