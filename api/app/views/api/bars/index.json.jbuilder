json.array! @bars do |bar|
  json.(bar, :id, :title, :content, :created_at)
end