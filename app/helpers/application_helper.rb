module ApplicationHelper
  require 'net/http'

  def current_price(coin)
    response = Net::HTTP.get_response(URI.parse(I18n.t("current_value.#{coin.downcase}")))
    JSON.parse(response.body)['USD'].to_s
  end

  def coin_24h_volume
    result_collection = {}
    Post.present_values_actual.each do |x|
      response = Net::HTTP.get_response(URI.parse(I18n.t("pricemultifull.#{x.downcase}")))
      result_collection["#{x}"] = JSON.parse(response.body)['RAW']["#{x}"]['USD']['CHANGEPCT24HOUR'].round(2)
    end
    result_collection
  end

  def putter(post)
    all_users = User.all.pluck(:username)
    content = post.content
    content_words = content.split(" ")
    content_with_links = content_words.map do |word|
      if Post.present_values.include? word
        link_to word, "/coins?type=#{word.reverse.chop.reverse.downcase}"
      elsif word[0] == '@' && all_users.include?(word[1..-1])
        link_to word, "/user/#{word[1..-1]}"
      elsif word =~ URI::regexp
        "<a href=#{word} target='blank'>#{word}</a>"
      #   # Net::HTTP.start(url.host, url.port) do |http|
      #   #   puts 'x'*100
      #   #   puts word.inspect
      #   #   image_tag(word) if http.head(url.request_uri)['Content-Type'].start_with? 'image'
      #   # end
      else
        word
      end
    end
    post.post_files.each do |f|
      content_with_links << image_tag(f.file_ref)
    end
    content_with_links.join(" ")
  end

  def resource_name
    :user
  end

  def resource_class
     User
  end

  def resource
    @resource ||= User.new
  end

  def devise_mapping
    @devise_mapping ||= Devise.mappings[:user]
  end
end
