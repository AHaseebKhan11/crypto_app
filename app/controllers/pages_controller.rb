# The pages controller contains all of the code for any page inside of /pages
class PagesController < ApplicationController
  before_action :new_post, only: %i[home profile explore]
  # back-end code for pages/index
  def index
  end

  def privacy_policy
    render file: 'public/privacy_policy.html', layout: false
  end

  # back-end code for pages/home
  def home
    following = Array.new
    for @f in current_user.following do
      following.push(@f.id)
    end

    @posts = Post.where("user_id IN (?)", following)
  end

  # back-end code for pages/profile
  def profile
    # grab the username from the URL as :id
    if (User.find_by_username(params[:id]))
      @username = params[:id]
      @posts = Post.all.where("user_id = ?", User.find_by_username(params[:id]).id)
    else
      # redirect to 404 (root for now)
      redirect_to root_path, :notice=> "User not found!"
    end

  end

  # back-end code for pages/explore
  def explore
    @posts = Post.without_comments
  end

  private
  def new_post
    @newPost = Post.new
  end
end
