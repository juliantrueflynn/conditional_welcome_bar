# frozen_string_literal: true

class Bar < ApplicationRecord
  SIZE_REGEX = /\d+(\.\d+)?px|\d+(\.\d+)%?|\d+(\.\d+)em?|inherit/.freeze
  TEXT_ALIGN = %w[center left right].freeze
  PLACEMENT = %w[top bottom].freeze
  NON_UPDATEABLE_COLUMNS = %w[
    id
    created_at
    updated_at
    shop_id
    background_image
    background_image_repeat
    background_image_size_x
    background_image_size_y
    background_image_position_x
    background_image_position_y
  ].freeze

  belongs_to :shop

  validates_presence_of(
    :title,
    :placement,
    :background_color,
    :text_color,
    :page_templates
  )
  validates_length_of :content, minimum: 0, allow_nil: false
  validates_inclusion_of :placement, in: PLACEMENT
  validates_inclusion_of :is_active, in: [true, false]
  validates_inclusion_of :is_sticky, in: [true, false]
  validates_inclusion_of :is_new_tab_url, in: [true, false]
  validates_inclusion_of :is_full_width_link, in: [true, false]
  validates_inclusion_of :has_close_button, in: [true, false]
  validates_inclusion_of :text_align, in: TEXT_ALIGN, allow_nil: true
  validates_format_of :font_size, with: SIZE_REGEX, allow_nil: true
  validates_format_of :padding_y, with: SIZE_REGEX, allow_nil: true
  validates_format_of :padding_x, with: SIZE_REGEX, allow_nil: true
  validates :url, url: true, allow_blank: true

  scope :with_active, -> { where(is_active: true) }

  def self.with_page_template(template)
    where("? = ANY (page_templates)", template)
  end

  def self.with_shopify_domain(shopify_domain)
    shop = Shop.find_by_shopify_domain(shopify_domain)
    where(shop_id: shop) if shop
  end

  def self.updatableable_columns
    Bar.column_names.reject { |name| NON_UPDATEABLE_COLUMNS.include?(name) }
  end

  def currently_active_or_is_active_changed?
    is_active? || saved_change_to_is_active?
  end

  after_update_commit(
    :toggle_active_page_template,
    if: :currently_active_or_is_active_changed?
  )

  private

  def toggle_active_page_template
    return update_is_active_for_all_templates if page_templates.include?("global")

    update_is_active_for_match_template
  end

  def update_is_active_for_all_templates
    bars_active_without_current.each do |bar|
      bar.update_columns(is_active: false)
    end
  end

  def update_is_active_for_match_template
    bars_active_without_current
      .with_page_template(page_templates)
      .or(bars_active_without_current.with_page_template("global"))
      .each { |bar| bar.update_columns(is_active: false) }
  end

  def bars_active_without_current
    shop.bars.with_active.where.not(id: id)
  end
end
