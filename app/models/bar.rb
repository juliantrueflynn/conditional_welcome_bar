class Bar < ApplicationRecord
  belongs_to :shop

  validates_presence_of :title,
    :content,
    :placement,
    :text_color,
    :template_enabled
    validates_inclusion_of :placement, in: %w(top bottom)
    validates_inclusion_of :is_sticky, in: [true, false]
    validates_inclusion_of :is_new_tab_url, in: [true, false]
  validates_inclusion_of :has_close_button, in: [true, false]
  validates_inclusion_of :template_enabled,
    in: %w(global homepage collection product)
  validates :url, url: true, allow_nil: true
end
