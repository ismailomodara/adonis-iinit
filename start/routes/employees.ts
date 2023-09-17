import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('', 'EmployeesController.index').as("index")

  Route.get('/:id', 'EmployeesController.show').as('show')

  Route.post('/', 'EmployeesController.store').as('store')

  Route.put('/:id', 'EmployeesController.update').as('update')

  Route.put('/:id/role', 'EmployeesController.role').as('update.role')

  Route.delete('/:id', 'EmployeesController.destroy').as('destroy')

}).prefix("/employees").as("employees")
