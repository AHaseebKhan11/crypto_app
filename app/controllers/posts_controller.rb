class PostsController < ApplicationController


    def new
        @post = Post.new
    end

    def create
        @post = Post.new(post_params)
        @post.user_id = current_user.id # assign the post to the user who created it.
        respond_to do |f|
            if (@post.save)
                extract_tags
                f.html { redirect_to :back, notice: "Post created!" }
            else
                f.html { redirect_to :back, notice: "Error: Post Not Saved." }
            end
        end
    end

    def search
        puts 'x'*500
        puts params.inspect
        @search_result = Post.search_for(params[:search_field])
        render :template => "pages/search_results"
    end

    private
    def post_params # allows certain data to be passed via form.
        params.require(:post).permit(:user_id, :content)
    end

    def extract_tags
        content_words = @post.content.split(" ")
        content_with_links = content_words.map do |word|
          if Post.present_values.include? word
            t = Tag.where(name: word.reverse.chop.reverse.downcase).first_or_create
            t.post_count += 1
            t.save!
            @post.tagged_posts.create(tag: t)
          end
        end
    end

end
