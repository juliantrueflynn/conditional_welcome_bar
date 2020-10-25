# frozen_string_literal: true

require "rails_helper"

RSpec.describe BarUpdaterService do
  it "returns true if updated" do
    bar = create(:bar)
    result = described_class.call(bar, title: Faker::Lorem.sentence)

    expect(result).to be(true)
  end

  it "returns false if failed to update" do
    bar = create(:bar, text_align: "center")
    result = described_class.call(bar, text_align: "this is invalid")

    expect(result).to be(false)
  end

  it "returns false if Bar nil" do
    result = described_class.call(nil, title: Faker::Lorem.sentence)

    expect(result).to be(false)
  end

  it "updates bar attributes" do
    bar = create(:bar, title: Faker::Lorem.sentence)
    new_title = Faker::Lorem.sentence

    described_class.call bar, title: new_title

    expect(bar).to have_attributes(title: new_title)
  end

  it "returns true for inserting new theme_templates and destroys non matching" do
    bar = create(:bar)
    old_theme_templates = create_list(:theme_template, 3, bar: bar)
    new_names = %w[new_name_one new_name_two]

    expect(bar.theme_templates).to match_array(old_theme_templates)
    described_class.call bar, theme_templates: new_names
    expect(bar.theme_templates.pluck(:name)).to match_array(new_names)
  end

  it "returns true for upserting new theme_templates and destroys non matching" do
    bar = create(:bar)
    old_theme_templates = create_list(:theme_template, 2, bar: bar)
    new_names = %w[new_name_one new_name_two].concat([old_theme_templates.first.name])

    expect(bar.theme_templates).to match_array(old_theme_templates)
    described_class.call bar, theme_templates: new_names
    expect(bar.theme_templates.pluck(:name)).to match_array(new_names)
  end

  it "ignores matching theme_templates" do
    bar = create(:bar)
    theme_templates = [Faker::Lorem.word]

    described_class.call bar, theme_templates: theme_templates

    expect(bar.theme_templates.pluck(:name)).to match_array(theme_templates)
  end

  it "updates bar attributes and theme_templates" do
    bar = create(:bar)
    new_title = Faker::Lorem.sentence
    new_names = %w[new_name_one new_name_two]

    described_class.call bar, title: new_title, theme_templates: new_names

    expect(bar).to have_attributes(title: new_title)
    expect(bar.theme_templates.pluck(:name)).to match_array(new_names)
  end

  it "allows aliased boolean column names" do
    bar = create(:bar, active: false, sticky: true, full_width_link: false, close_button: true)
    attributes = {
      is_sticky: true,
      is_full_width_link: false,
      has_close_button: true
    }

    described_class.call bar, attributes

    expect(bar).to have_attributes(attributes)
  end
end
