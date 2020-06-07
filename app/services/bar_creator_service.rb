# frozen_string_literal: true

class BarCreatorService
  DEFAULT_ATTRIBUTES = {
    title: "Example welcome bar title",
    padding_y: "10px",
    padding_x: "10px",
    text_color: "rgba(255,255,255,1.0)",
    font_size: "inherit",
    background_color: "rgba(45,52,54,1.0)"
  }.freeze

  def self.call(shop, attributes = {})
    new(shop, attributes).call
  end

  def initialize(shop, attributes)
    @shop = shop
    @attributes = attributes
  end

  def call
    @shop.bars.create DEFAULT_ATTRIBUTES.merge(@attributes)
  end
end
