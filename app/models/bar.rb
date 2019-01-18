class Bar < ApplicationRecord
  belongs_to :shop
  mount_uploader :background_image, BackgroundUploader

  validates_presence_of :title,
    :content,
    :placement,
    :font_color,
    :template_enabled
  validates_inclusion_of :placement, in: %w(top bottom)
  validates_inclusion_of :is_sticky, in: [true, false]
  validates_inclusion_of :is_new_tab_url, in: [true, false]
  validates_inclusion_of :has_close_button, in: [true, false]
  validates_inclusion_of :template_enabled,
    in: %w(global homepage collection product)
  validates_inclusion_of :background_image_repeat,
    in: %w(no-repeat repeat-x repeat-y repeat space)
  validates :url, url: true, allow_nil: true
end
