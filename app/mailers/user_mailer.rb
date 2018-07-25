class UserMailer < ApplicationMailer
  default from: 'coincobbler.dev@gmail.com'

  def moderator_signup_email(user)
    @user = user
    mail(to: user.email, subject: 'New Moderator Signup')
  end
end
