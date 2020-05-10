# frozen_string_literal: true

require "rails_helper"

RSpec.describe ShopSessionFinderService do
  it "returns matching shop instance" do
    shop = create(:shop)
    session = mock_shopify_session(shop: shop)
    allow(Shop).to receive(:retrieve).with(shop.id).and_return(session)

    result = described_class.call(shop_id: shop.id)

    expect(result).to be_an_instance_of(Shop)
    expect(result).to eq(shop)
  end

  it "returns nil if no session match" do
    shop = create(:shop)
    allow(Shop).to receive(:retrieve).with(shop.id).and_return(nil)

    result = described_class.call(shop_id: shop.id)

    expect(result).to be_nil
  end

  def mock_shopify_session(shop:)
    ShopifyAPI::Session.new(
      domain: shop.shopify_domain,
      token: shop.shopify_token,
      api_version: shop.api_version
    )
  end
end
