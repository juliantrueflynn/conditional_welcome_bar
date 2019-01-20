class Shop < ActiveRecord::Base
  include ShopifyApp::SessionStorage

  has_many :bars

  def self.by_domain_name(hostname)
    shopify_domain = "#{hostname}.myshopify.com"
    find_by_shopify_domain(shopify_domain)
  end

  after_create_commit :generate_default_bar

  private

  def generate_default_bar
    bars.create(title: 'First welcome bar!')
  end
end
