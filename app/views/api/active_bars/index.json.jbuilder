json.array! @active_bars do |bar|
  json.(bar, *bar.attributes.except(*Bar::SCRUB_PARAMS).keys)
end