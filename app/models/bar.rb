# frozen_string_literal: true

class Bar < ApplicationRecord
  SIZE_REGEX = /\A\d+(\.\d+)?px|\d+(\.\d+)%?|\d+(\.\d+)em?|inherit\z/.freeze
  ALIGN = %w[left right center justify initial inherit].freeze
  PLACEMENT = %w[top bottom].freeze
  BOOLEAN_COLUMN_ALIASES = {
    is_active: :active,
    is_sticky: :sticky,
    is_new_tab_url: :new_tab_url,
    is_full_width_link: :full_width_link,
    has_close_button: :close_button
  }.freeze

  # Aliases used for easier use with GraphQL and easier reading boolean names for clientside.
  # Example: Bar#active aliased as Bar#is_active
  BOOLEAN_COLUMN_ALIASES.each do |(alias_to, alias_from)|
    alias_attribute alias_to, alias_from
  end

  belongs_to :shop
  has_many :theme_templates, dependent: :delete_all

  accepts_nested_attributes_for :theme_templates, allow_destroy: true

  validates :title, :placement, presence: true
  validates :content, length: { maximum: 2000 }
  validates :placement, inclusion: PLACEMENT
  validates :text_align, inclusion: ALIGN, allow_nil: true
  validates :font_size, :padding_y, :padding_x, format: SIZE_REGEX, allow_nil: true
  validates :url, url: true, allow_blank: true
  validates(*BOOLEAN_COLUMN_ALIASES.values, inclusion: [true, false])

  scope :with_active, -> { where(active: true) }

  def self.with_shopify_domain(shopify_domain)
    where shop_id: Shop.find_by(shopify_domain: shopify_domain)
  end
end
