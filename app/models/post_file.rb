class PostFile < ApplicationRecord
  enum status: %i[image]
  mount_uploader :file_ref, PostFileUploader
  belongs_to :post
end
