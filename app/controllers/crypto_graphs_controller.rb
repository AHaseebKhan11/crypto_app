class CryptoGraphsController < ApplicationController
  require 'net/http'
  before_action :set_filters, :new_post

  def index
    respond_to do |format|
      format.html
      format.json { render json: {response: get_response, coin: @coin_type} }
    end
  end

  private

  def new_post
    @newPost = Post.new
  end

  def set_filters
    @coin_type = params[:type] || 'btc'
    get_coin_price if params[:type]
  end

  def get_coin_price
    response = Net::HTTP.get_response(URI.parse(I18n.t("pricemultifull.#{@coin_type.downcase}")))
    @coin_price = {
                    volume: JSON.parse(response.body)['RAW']["#{@coin_type.upcase}"]['USD']['CHANGEPCT24HOUR'].round(2),
                    price: JSON.parse(response.body)['RAW']["#{@coin_type.upcase}"]['USD']['PRICE'].round(2).to_s
                  }
  end

  def get_response
    @coin_type = 'btc' if @coin_type == ''
    response = Net::HTTP.get_response(URI.parse(I18n.t @coin_type.downcase))
    data = []
    JSON.parse(response.body)["Data"].each do |x|
      data << [Time.at(x['time']).to_datetime.getutc.to_i*1000, x['close']]
    end
    data
  end

end
