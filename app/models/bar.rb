# frozen_string_literal: true

class Bar < ApplicationRecord
  SIZE_REGEX = /\d+(\.\d+)?px|\d+(\.\d+)%?|\d+(\.\d+)em?|inherit/.freeze
  TEXT_ALIGN = %w[center left right].freeze
  PLACEMENT = %w[top bottom].freeze
  NON_UPDATEABLE_COLUMNS = %w[id created_at updated_at shop_id].freeze

  belongs_to :shop

  validates :title, :placement, :background_color, :text_color, :page_templates, presence: true
  validates :content, length: { minimum: 0 }
  validates :is_active, :is_sticky, :is_new_tab_url, :is_full_width_link, :has_close_button, inclusion: [true, false]
  validates :placement, inclusion: PLACEMENT
  validates :text_align, inclusion: TEXT_ALIGN, allow_nil: true
  validates :font_size, :padding_y, :padding_x, format: SIZE_REGEX, allow_nil: true
  validates :url, url: true, allow_blank: true

  scope :with_active, -> { where(is_active: true) }

  self.ignored_columns = %i[
    background_image
    background_image_repeat
    background_image_size_x
    background_image_size_y
    background_image_position_x
    background_image_position_y
  ].freeze

  def self.with_page_template(template)
    where "? = ANY (page_templates)", template
  end

  def self.with_shopify_domain(shopify_domain)
    where shop_id: Shop.find_by(shopify_domain: shopify_domain)
  end

  def self.updatableable_columns
    column_names.reject { |name| NON_UPDATEABLE_COLUMNS.include?(name) }
  end

  def currently_active_or_is_active_changed?
    is_active? || saved_change_to_is_active?
  end

  after_update_commit :toggle_active_page_template, if: :currently_active_or_is_active_changed?

  private

  def toggle_active_page_template
    return update_is_active_for_all_templates if page_templates.include?("global")

    update_is_active_for_match_template
  end

  def update_is_active_for_all_templates
    bars_active_without_current.update_all is_active: false, updated_at: Time.zone.now
  end

  def update_is_active_for_match_template
    bars_active_without_current.
      with_page_template(page_templates).
      or(bars_active_without_current.with_page_template("global")).
      update_all(is_active: false, updated_at: Time.zone.now)
  end

  def bars_active_without_current
    shop.bars.with_active.where.not id: id
  end
end
