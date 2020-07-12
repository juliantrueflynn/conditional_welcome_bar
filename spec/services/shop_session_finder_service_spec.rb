# frozen_string_literal: true

require "rails_helper"

RSpec.describe ShopSessionFinderService do
  it "returns matching shop instance" do
    shop = create(:shop)
    stub_shop_in_sessions_storage(shop)

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

  it "logs if session match found" do
    shop = create(:shop)
    stub_shop_in_sessions_storage(shop)
    allow(Rails.logger).to receive(:info)
    allow(Rails.logger).to receive(:warn)

    described_class.call(shop_id: shop.id)

    expect(Rails.logger).to have_received(:info).with(/Shop session initialized/)
    expect(Rails.logger).not_to have_received(:warn)
  end

  it "logs warning if session match not found" do
    # Using build_stubbed to make a fake ID that will not match in session.
    shop = build_stubbed(:shop)
    stub_shop_in_sessions_storage(shop)
    log_message = "No shop session found for domain #{shop.domain}"
    allow(Rails.logger).to receive(:warn)
    allow(Rails.logger).to receive(:info)

    described_class.call(shop_id: shop.id)

    expect(Rails.logger).to have_received(:warn).with(log_message)
    expect(Rails.logger).not_to have_received(:info)
  end

  def stub_shop_in_sessions_storage(shop)
    session = mock_shopify_session(shop: shop)
    allow(Shop).to receive(:retrieve).with(shop.id).and_return(session)
  end

  def mock_shopify_session(shop:)
    ShopifyAPI::Session.new(
      domain: shop.shopify_domain,
      token: shop.shopify_token,
      api_version: shop.api_version
    )
  end
end
