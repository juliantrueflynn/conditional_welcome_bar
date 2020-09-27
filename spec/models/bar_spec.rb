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

  describe "validate #url" do
    it "not valid if containing space" do
      expect(build(:bar, url: "url space.com")).to_not be_valid
    end

    it "not valid if containing no tld" do
      expect(build(:bar, url: "no dot com")).to_not be_valid
    end
  end

  describe "#padding" do
    it "returns string y x format" do
      instance = build(:bar, padding_y: "2px", padding_x: "4px")

      expect(instance.padding).to eq("2px 4px")
    end

    it "returns 0 for y-axis" do
      instance = build(:bar, padding_y: nil, padding_x: "99px")

      expect(instance.padding).to eq("0 99px")
    end

    it "returns 0 for x-axis" do
      instance = build(:bar, padding_y: "99px", padding_x: nil)

      expect(instance.padding).to eq("99px 0")
    end

    it "returns 0 for both axis" do
      instance = build(:bar, padding_y: nil, padding_x: nil)

      expect(instance.padding).to eq("0 0")
    end
  end
end
