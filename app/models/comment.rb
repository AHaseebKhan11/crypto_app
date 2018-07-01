class Comment < ApplicationRecord
  belongs_to :post
  belongs_to :commented_post, class_name: 'Post'
end
