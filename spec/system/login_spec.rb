# frozen_string_literal: true

require "rails_helper"

RSpec.describe "login page", type: :system, js: true do
  it "redirects to shopify" do
    mock_shopify_omniauth domain: "jiffywelcomebar.myshopify.com"
    stub_script_tags_api_request
    visit "/login"
    fill_in "shop", with: "jiffywelcomebar"
    click_on "Install"

    # Needs to be rewritten later with custom matcher to check for Shopify domain.
    expect(page).to have_no_current_path("/login")
  end
end
