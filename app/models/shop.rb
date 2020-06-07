# frozen_string_literal: true

class Shop < ApplicationRecord
  include ShopifyApp::ShopSessionStorage

  # Alias attributes :domain and :token are used to match ShopifyApi::Session attributes.
  alias_attribute :domain, :shopify_domain
  alias_attribute :token, :shopify_token

  has_many :bars, dependent: :delete_all

  validates :shopify_domain, :shopify_token, presence: true
  validates :shopify_domain, uniqueness: true

  def api_version
    ShopifyApp.configuration.api_version
  end

  after_create_commit :generate_default_bar

  private

  def generate_default_bar
    BarCreatorService.call(self)
  end
end
