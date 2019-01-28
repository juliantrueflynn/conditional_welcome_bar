json.array! @bars do |bar|
  json.(bar, :id, :title, :content)
end