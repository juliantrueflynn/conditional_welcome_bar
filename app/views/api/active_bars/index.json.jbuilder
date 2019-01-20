json.array! @active_bars do |bar|
  json.(bar, *bar.attributes.keys)
end