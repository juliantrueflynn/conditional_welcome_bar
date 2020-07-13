# frozen_string_literal: true

require "rails_helper"

RSpec.describe BarUserErrorsMapper do
  it "returns array of with #field and #message" do
    bar = build(:bar, active: nil, title: nil)
    bar.valid? # Triggers error messages.
    expected_result = [
      UserError.new(field: ["isActive"], message: bar.errors[:active].first),
      UserError.new(field: ["title"], message: bar.errors[:title].first)
    ]

    result = described_class.call(bar)

    expect(result).to match_array(expected_result)
  end

  it "returns empty array if valid bar instance" do
    bar = build(:bar)
    result = described_class.call(bar)

    expect(result).to be_empty
  end

  it "returns empty array if input nil" do
    result = described_class.call(nil)

    expect(result).to be_empty
  end
end
