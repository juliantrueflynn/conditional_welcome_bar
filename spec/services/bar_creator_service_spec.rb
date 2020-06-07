# frozen_string_literal: true

require "rails_helper"

RSpec.describe BarCreatorService do
  it "returns bar" do
    shop = create(:shop)
    result = described_class.call(shop)

    expect(result).to be_an_instance_of(Bar)
  end

  it "sets attributes to defaults" do
    shop = create(:shop)
    result = described_class.call(shop)

    expect(result).to have_attributes(described_class::DEFAULT_ATTRIBUTES)
  end

  it "allows default attributes to be overriden" do
    new_title = "Hello world!"
    old_content = "Some default content"
    stub_const "#{described_class.name}::DEFAULT_ATTRIBUTES", title: "Some default title", content: old_content
    shop = create(:shop)
    result = described_class.call(shop, title: new_title)

    expect(result).to have_attributes(title: new_title, content: old_content)
  end
end
