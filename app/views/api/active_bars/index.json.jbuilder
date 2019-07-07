# frozen_string_literal: true

exclude = %w[title created_at updated_at shop_id is_active background_image]

json.status 200

json.data do
  json.bars do
    json.array! @active_bars do |bar|
      json.call(bar, *bar.attributes.except(exclude).keys)
      json.background_image bar.background_image.url
    end
  end
end
