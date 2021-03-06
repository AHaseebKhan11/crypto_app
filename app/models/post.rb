class Post < ApplicationRecord
  belongs_to :user
  has_many :likes, dependent: :destroy
  has_many :comments, dependent: :destroy
  has_many :commented_post, dependent: :destroy
  has_many :users, through: :likes
  has_many :tagged_posts, dependent: :destroy
  has_many :tags, through: :taged_posts
  belongs_to :post, required: false
  has_many :post_files
  validates :user_id, presence: true
  validates :content, presence: true, length: { maximum: 140 } # tweets are capped at 140 chars.
  default_scope -> { order(created_at: :desc) } # newest tweets / posts first
  cattr_accessor :present_values, :present_values_actual
  scoped_search on: [:content]
  # default_scope{where(comment_id: nil)}
  scope :without_comments, -> { where(comment_id: nil) }


  @@present_values = ['$BTC',
                      '$ETH',
                      '$EOS',
                      '$BCH',
                      '$TRX',
                      '$LTC',
                      '$XRP',
                      '$ETC',
                      '$CTXC',
                      '$DASH',
                      '$ADA',
                      '$ONT',
                      '$IOT',
                      '$NEO',
                      '$XLM',
                      '$QTUM',
                      '$BNB',
                      '$HT',
                      '$XMR',
                      '$ZEC',
                      '$DGB']
  @@present_values_actual = ['BTC',
                              'ETH',
                              'EOS',
                              'BCH',
                              'TRX',
                              'LTC',
                              'XRP',
                              'ETC',
                              'CTXC',
                              'DASH',
                              'ADA',
                              'ONT',
                              'IOT',
                              'NEO',
                              'XLM',
                              'QTUM',
                              'BNB',
                              'HT',
                              'XMR',
                              'ZEC',
                              'DGB']
end
