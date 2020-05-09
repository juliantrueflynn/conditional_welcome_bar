# frozen_string_literal: true

class Shop < ActiveRecord::Base
  include ShopifyApp::ShopSessionStorage

  # Alias attributes :domain and :token are used to match ShopifyApi::Session attributes.
  alias_attribute :domain, :shopify_domain
  alias_attribute :token, :shopify_token

  has_many :bars, dependent: :delete_all

  validates_presence_of :shopify_domain, :shopify_token
  validates_uniqueness_of :shopify_domain

  def api_version
    ShopifyApp.configuration.api_version
  end

  after_create_commit :generate_default_bar

  private

  def generate_default_bar
    bars.create(title: "First welcome bar!")
  end
end
