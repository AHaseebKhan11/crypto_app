class UserMailer < ApplicationMailer
  default from: 'coincobbler.dev@gmail.com'

  def moderator_signup_email(user)
    @user = user
    mail(to: 'gregb888@me.com', subject: 'New Moderator Signup')
  end
end
