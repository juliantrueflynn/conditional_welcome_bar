# frozen_string_literal: true

require "rails_helper"

RSpec.describe Bar, type: :model do
  it { is_expected.to belong_to(:shop) }
  it { is_expected.to have_many(:theme_templates) }

  it { is_expected.to validate_presence_of :title }
  it { is_expected.to_not allow_value(nil).for(:active) }
  it { is_expected.to_not allow_value(nil).for(:sticky) }
  it { is_expected.to_not allow_value(nil).for(:new_tab_url) }
  it { is_expected.to_not allow_value(nil).for(:full_width_link) }
  it { is_expected.to_not allow_value(nil).for(:close_button) }
  it { is_expected.to allow_value("inherit").for(:font_size) }
  it { is_expected.to allow_value("15px").for(:font_size) }
  it { is_expected.to allow_value("15px").for(:padding_y) }
  it { is_expected.to allow_value("15px").for(:padding_x) }
  it { is_expected.to allow_value("15.5px").for(:font_size) }
  it { is_expected.to allow_value("15.5px").for(:padding_y) }
  it { is_expected.to allow_value("15.5px").for(:padding_x) }
  it { is_expected.to_not allow_value(15).for(:font_size) }
  it { is_expected.to_not allow_value(15).for(:padding_y) }
  it { is_expected.to_not allow_value(15).for(:padding_x) }
  it { is_expected.to validate_length_of(:content).is_at_least(0) }
  it { is_expected.to validate_inclusion_of(:placement).in_array(Bar::PLACEMENT) }
  it { is_expected.to validate_inclusion_of(:text_align).in_array(Bar::ALIGN) }

  describe ".with_shopify_domain" do
    it "returns bar relation" do
      shop = create(:shop_with_bars)
      result = described_class.with_shopify_domain(shop.shopify_domain)

      expect(result).to match_array(shop.bars)
    end

    it "returns empty relation if no shop" do
      result = described_class.with_shopify_domain(nil)

      expect(result).to be_empty
    end
  end

  describe "validate #url" do
    it "not valid if containing space" do
      expect(build(:bar, url: "url space.com")).to_not be_valid
    end

    it "not valid if containing no tld" do
      expect(build(:bar, url: "no dot com")).to_not be_valid
    end
  end
end
