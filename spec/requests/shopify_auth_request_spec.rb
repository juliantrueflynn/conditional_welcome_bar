require 'rails_helper'
require 'support/shopify_test_helpers'

RSpec.configure do |c|
  c.include ShopifyTestHelpers
end

RSpec.describe "Shopify auth", type: :request do
  describe "redirect to shopify callback" do
    before { login }

    it "when session valid" do
      expect(response).to redirect_to(Rails.application.env_config['omniauth.auth'].callback_url)
    end
  end
end
