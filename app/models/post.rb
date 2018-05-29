class Post < ActiveRecord::Base
  belongs_to :user
  has_many :tagged_posts
  has_many :tags, through: :taged_posts
  validates :user_id, presence: true
  validates :content, presence: true, length: { maximum: 140 } # tweets are capped at 140 chars.
  default_scope -> { order(created_at: :desc) } # newest tweets / posts first
  cattr_accessor :present_values, :present_values_actual
  scoped_search on: [:content]

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
                      '$ZEC']
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
                              'ZEC']
end
