# frozen_string_literal: true

require "rails_helper"

RSpec.describe ShopifyScripttagsService do
  it "contains javascript url without domain param" do
    host = mock_app_host
    base_url = host + described_class::BASE_PATH
    src_object = {
      event: "onload",
      src: "#{base_url}.js?cwb_api_host=https%3A%2F%2Fexample.com"
    }

    result = described_class.call

    expect(result).to match([src_object])
  end

  it "contains javascript url with domain param" do
    host = mock_app_host
    base_url = host + described_class::BASE_PATH
    src_object = {
      event: "onload",
      src: "#{base_url}.js?cwb_api_host=https%3A%2F%2Fexample.com&domain=ex.myshopify.com"
    }

    result = described_class.call("ex.myshopify.com")

    expect(result).to match([src_object])
  end

  def mock_app_host
    host = "https://example.com"
    allow(Rails.configuration.x).to receive(:app_host).and_return(host)
    host
  end
end
