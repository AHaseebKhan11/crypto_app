class PostsController < ApplicationController


    def new
        @post = Post.new
    end

    def show
        unread_notif = current_user.notifications.unread.where(notifiable_id: params[:id], action: 'tagged')
        mark_as_read(unread_notif) if unread_notif.length > 0
        @post = Post.find(params[:id])
    end

    def create
        @post = Post.new(post_params)
        @post.user_id = current_user.id
        respond_to do |f|
            if (@post.save)
                upload_image if params[:post][:image]
                extract_tags
                # tag_users
                f.html { redirect_to :back, notice: "Post created!" }
            else
                f.html { redirect_to :back, notice: "Error: Post Not Saved." }
            end
        end
    end

    def search
        @search_result = Post.search_for(params[:search_field])
        render :template => "pages/search_results"
    end

    private

    def mark_as_read(notifications)
        notifications.each do |notif|
            notif.update(read_at: Time.now)
        end
    end

    def upload_image
        upload = PostFile.new
        upload.file_ref = File.open params[:post][:image].tempfile.path
        upload.post = @post
        upload.file_type = 'image'
        upload.save!
    end

    def post_params # allows certain data to be passed via form.
        params.require(:post).permit(:user_id, :content)
    end

    # def tag_users
    #     recipients.each do |recipient|
    #       Notification.create(recipient: recipient, actor: self.user,
    #         action: 'posted', notifiable: self)
    #     end
    # end

    def extract_tags
        all_users = User.all.pluck(:username)
        content_words = @post.content.split(" ")
        content_with_links = content_words.map do |word|
          if Post.present_values.include? word
            t = Tag.where(name: word.reverse.chop.reverse.downcase).first_or_create
            t.post_count += 1
            t.save!
            @post.tagged_posts.create(tag: t)
          elsif word[0] == '@' && all_users.include?(word[1..-1])
            puts 'x'*900
            puts 'reciepent'
            puts User.find_by(username: (word[1..-1])).inspect
            Notification.create(recipient: User.find_by(username: (word[1..-1])), actor: current_user, action: 'tagged', notifiable: @post)
          end
        end
    end

end
