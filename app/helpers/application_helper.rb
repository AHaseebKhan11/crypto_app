module ApplicationHelper
  require 'net/http'

  def putter(post)
    content = post.content
    content_words = content.split(" ")
    content_with_links = content_words.map do |word|
      if Post.present_values.include? word
        link_to word, "/coins?type=#{word.reverse.chop.reverse.downcase}"
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
end
