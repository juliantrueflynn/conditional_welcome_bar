# frozen_string_literal: true

require "rails_helper"

RSpec.describe ThemeTemplate, type: :model do
  it { is_expected.to belong_to(:bar) }

  it "validates uniqueness :bar_id" do
    instance = create(:theme_template)
    expect(instance).to validate_uniqueness_of(:bar_id).scoped_to(:name)
  end
end
