class RelationshipsController < ApplicationController

    def create
        user = User.find(params[:followed_id])
        current_user.follow(user)
        redirect_to "/user/#{user.username}"
    end

    def destroy
        # user = Relationship.find(params[:id]).followed
        user = User.find(params[:id])
        current_user.unfollow(user)
        redirect_to "/user/#{user.username}"
    end

end
