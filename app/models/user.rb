class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  mount_uploader :avatar, AvatarUploader

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  # attr_accessible :email, :password, :remember_me, :avatar, :avatar_cache, :remove_avatar
  # validates_presence_of   :avatar
  validates_integrity_of  :avatar
  validates_processing_of :avatar
  has_many :posts, dependent: :destroy # remove a user's posts if his account is deleted.
  has_many :active_relationships, class_name: "Relationship", foreign_key: "follower_id", dependent: :destroy
  has_many :passive_relationships, class_name: "Relationship", foreign_key: "followed_id", dependent: :destroy

  has_many :likes, dependent: :destroy
  # has_many :posts, through: :likes

  has_many :following, through: :active_relationships, source: :followed
  has_many :followers, through: :passive_relationships, source: :follower
  after_create :default_avatar
  has_many :notifications, foreign_key: :recipient_id

  attr_accessor :crop_x, :crop_y, :crop_w, :crop_h
  after_update :crop_avatar

  def crop_avatar
    avatar.recreate_versions! if crop_x.present?
  end

  # helper methods
  def default_avatar
    self.update(avatar: File.open(File.join(Rails.root, '/public/avatar.png')))
  end

  # follow another user
  def follow(other)
   active_relationships.create(followed_id: other.id)
  end

  # unfollow a user
  def unfollow(other)
   active_relationships.find_by(followed_id: other.id).destroy
  end

  # is following a user?
  def following?(other)
   following.include?(other)
  end

  # creates a new like row with post_id and user_id
  def like!(post)
    self.likes.create!(post_id: post.id)
  end

  # destroys a like with matching post_id and user_id
  def unlike!(post)
    like = self.likes.find_by_post_id(post.id)
    like.destroy!
  end

  # returns true or false if a post is liked by user
  def like?(post)
    self.likes.find_by_post_id(post.id)
  end
end
