class UsersController < ApplicationController

  def all_users
    respond_to do |format|
      format.json { render json: {response: User.all.pluck(:username)} }
    end
  end

  def update_avatar
    @user = current_user
    if @user.update_attributes(user_params)
      if params[:user][:avatar].present?
        render :cropper
      else
        redirect_to :root, notice: "Successfully updated user."
      end
    else
      render :new
    end
  end

  def crop
    @user = current_user
  end

  private

  def user_params
    params.require(:user).permit(:name, :avatar, :crop_x, :crop_y, :crop_w, :crop_h)
  end

end
