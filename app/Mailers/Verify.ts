import { BaseMailer, MessageContract } from '@ioc:Adonis/Addons/Mail'
import Employee from "App/Models/Employee";

export default class Verify extends BaseMailer {
  constructor(private employee: Employee, private code: number) {
    super()
  }
  /**
   * WANT TO USE A DIFFERENT MAILER?
   *
   * Uncomment the following line of code to use a different
   * mailer and chain the ".options" method to pass custom
   * options to the send method
   */
  // public mailer = this.mail.use()

  /**
   * The prepare method is invoked automatically when you run
   * "Verify.send".
   *
   * Use this method to prepare the email message. The method can
   * also be async.
   */
  public prepare(message: MessageContract) {
    message
      .subject('Verify your email')
      .from('noreply@eiyan.co')
      .to(this.employee.email)
      .html(`Use code - ${this.code} to verify your account`)
  }
}
