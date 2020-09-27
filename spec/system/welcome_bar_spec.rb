# frozen_string_literal: true

require "rails_helper"

RSpec.describe "welcome bar script", type: :system, js: true do
  before do
    Rails.application.routes.append do
      scope "/mock_shopify_scrips" do
        constraints shop: /.*/ do
          get "/with_close_button/:shop", to: "mock_welcome_bar#with_close_button"
          get "/with_localstorage/:shop", to: "mock_welcome_bar#with_localstorage"
        end
      end
    end

    Rails.application.reload_routes!
  end

  it "allows clicking to close banner" do
    welcome_bar = create_active_welcome_bar

    visit "/mock_shopify_scrips/with_close_button/#{welcome_bar.shop.domain}"

    expect(page).to have_content(welcome_bar.content)
    find("button#cw_bar_button").click
    expect(page).to have_no_content(welcome_bar.content)
  end

  it "does not render if localStorage present" do
    welcome_bar = create_active_welcome_bar

    visit "/mock_shopify_scrips/with_localstorage/#{welcome_bar.shop.domain}"

    expect(page).to have_no_content(welcome_bar.content)
  end

  def create_active_welcome_bar(attributes = {})
    create :bar, :active, content: Faker::Lorem.sentence, **attributes
  end

  class MockWelcomeBarController < ActionController::Base
    def with_close_button
      render html: helpers.raw(
        <<~HTML
          <head>
            <script>window.Shopify = {shop: "#{params[:shop]}"}</script>
            #{helpers.javascript_include_tag("/shopify/welcome_bar?cwb_api_host=#{Capybara.app_host}", defer: true)}
          </head>
          <body>Hello World!</body>
        HTML
      )
    end

    def with_localstorage # rubocop:disable Metrics/MethodLength
      render html: helpers.raw(
        <<~HTML
          <head>
            <script>
              window.Shopify = {shop: "#{params[:shop]}"}
              window.localStorage.setItem('cw_bar_view', 'true')
            </script>
            #{helpers.javascript_include_tag("/shopify/welcome_bar?cwb_api_host=#{Capybara.app_host}", defer: true)}
          </head>
          <body>Hello World!</body>
        HTML
      )
    end
  end
end
