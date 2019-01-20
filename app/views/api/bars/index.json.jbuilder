json.array! @bars do |bar|
  json.(bar, @bar.attributes.keys)
end