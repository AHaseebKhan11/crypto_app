class Comment < ActiveRecord::Base
  belongs_to :post
  belongs_to :commented_post, class_name: 'Post'
end
