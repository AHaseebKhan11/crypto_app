class UsersController < ApplicationController

  def all_users
    respond_to do |format|
      format.json { render json: {response: User.all.pluck(:username)} }
    end
  end

end
