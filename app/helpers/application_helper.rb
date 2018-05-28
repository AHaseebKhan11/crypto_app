module ApplicationHelper
  def putter(content)
    content_words = content.split(" ")
    content_with_links = content_words.map do |word|
      if Post.present_values.include? word
        link_to word, "/graphs?type=#{word.reverse.chop.reverse.downcase}"
      else
        word
      end
    end

    content_with_links.join(" ")
  end
end
