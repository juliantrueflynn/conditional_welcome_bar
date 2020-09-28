# frozen_string_literal: true

require "rails_helper"

RSpec.describe "/api/active_bars" do
  describe "#show" do
    it "responds with json" do
      welcome_bar = create_active_welcome_bar

      get api_active_bar_path(welcome_bar.shop.domain)

      expect(response).to have_http_status(:ok)
      expect(response.content_type).to eq("application/json; charset=utf-8")
    end

    it "returns json data for bar" do
      welcome_bar = create_active_welcome_bar

      get api_active_bar_path(welcome_bar.shop.domain)
      json_data = {
        "htmlStyles" => kind_of(String),
        "htmlWelcomeBar" => kind_of(String),
        "scriptsPaths" => kind_of(Array)
      }

      expect(JSON.parse(response.body)).to match("data" => json_data)
    end

    it "returns nil json data if no shop" do
      get api_active_bar_path("some-fake-shop.myshopify.com")

      expect(JSON.parse(response.body)).to match("data" => nil)
    end

    it "returns nil json data if no bars" do
      shop = create(:shop)
      shop.bars.delete_all

      get api_active_bar_path(shop.domain)

      expect(JSON.parse(response.body)).to match("data" => nil)
    end

    it "returns nil json data if no active bars" do
      welcome_bar = create_inactive_welcome_bar

      get api_active_bar_path(welcome_bar.shop.domain)

      expect(JSON.parse(response.body)).to match("data" => nil)
    end
  end

  def create_inactive_welcome_bar(attributes = {})
    create :bar, active: false, **attributes
  end

  def create_active_welcome_bar(attributes = {})
    create :bar, :active, **attributes
  end
end
