class Shop < ActiveRecord::Base
  include ShopifyApp::SessionStorage

  has_many :bars

  validates_presence_of :shopify_domain, :shopify_token
  validates_uniqueness_of :shopify_domain

  def self.find_or_initialize_by_domain(shopify_domain, &block)
    find_or_initialize_by(shopify_domain: shopify_domain, &block)
  end

  def api_version
    ShopifyApp.configuration.api_version
  end

  after_create_commit :generate_default_bar

  private

  def generate_default_bar
    bars.create(title: 'First welcome bar!')
  end
end
