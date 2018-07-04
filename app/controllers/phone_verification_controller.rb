class PhoneVerificationController < ApplicationController

  def index
    respond_to do |format|
      if(current_user.phone_number.present? && !current_user.phone_verified)
        generate_pin if(!current_user.phone_verification_pin || params[:new_pin])
        if params[:new_pin]
          format.html { redirect_to :back }
        else
          format.html
        end
      else
        notice = 'Please enter phone number first' unless current_user.phone_number.present?
        format.html { redirect_to :back, notice: notice || 'Phone number already verified' }
      end
    end
  end

  def verify_pin
    if params[:verify][:phone_verification_code] == current_user.phone_verification_pin
      current_user.update(phone_verified: true)
      redirect_to '/users/edit', notice: 'Phone Number Successfully Verified'
    else
      redirect_to :back, notice: 'Pin Was Incorrect'
    end
  end

  private

  def generate_pin
    pin = rand(0000..9999).to_s.rjust(4, "0")
    current_user.update(phone_verification_pin: pin)
    twilio_client.messages.create(
      to: current_user.phone_number,
      from: ENV['TWILIO_PHONE_NUMBER'],
      body: "Your PIN is #{pin}"
    )
  end

  def twilio_client
    Twilio::REST::Client.new(ENV['TWILIO_ACCOUNT_SID'], ENV['TWILIO_AUTH_TOKEN'])
  end

end
