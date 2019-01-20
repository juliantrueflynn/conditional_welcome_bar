class Bar < ApplicationRecord
  PX_REGEX = /\d+(\.\d+)?px/

  mount_uploader :background_image, BackgroundUploader

  belongs_to :shop

  validates_presence_of :title,
    :content,
    :placement,
    :font_color,
    :template_enabled
  validates_inclusion_of :placement, in: %w(top bottom)
  validates_inclusion_of :is_active, in: [true, false]
  validates_inclusion_of :is_sticky, in: [true, false]
  validates_inclusion_of :is_new_tab_url, in: [true, false]
  validates_inclusion_of :has_close_button, in: [true, false]
  validates_inclusion_of :template_enabled,
    in: %w(global homepage collection product)
  validates_inclusion_of :background_image_repeat,
    in: %w(no-repeat repeat-x repeat-y repeat space)
  validates_inclusion_of :text_align, in: %w(center left right), allow_nil: true
  validates_format_of :font_size, with: PX_REGEX, allow_nil: true
  validates_format_of :padding_top, with: PX_REGEX, allow_nil: true
  validates_format_of :padding_right, with: PX_REGEX, allow_nil: true
  validates_format_of :padding_bottom, with: PX_REGEX, allow_nil: true
  validates_format_of :padding_left, with: PX_REGEX, allow_nil: true
  validates_numericality_of :text_opacity,
    less_than_or_equal_to: 1,
    greater_than_or_equal_to: 0,
    allow_nil: true
  validates_numericality_of :background_opacity,
    less_than_or_equal_to: 1,
    greater_than_or_equal_to: 0,
    allow_nil: true
  validates :url, url: true, allow_nil: true

  def self.to_decimal(integer)
    return 1.0 if integer > 100
    return 0.0 if integer < 0
    integer.to_f / 100
  end

  def opacity(integer, param)
    decimal = Bar.to_decimal(integer)
    update_attribute(param, decimal)
    self
  end
end
