# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Shop, type: :model do
  it { is_expected.to have_many(:bars) }
  it { is_expected.to validate_presence_of :shopify_token }
  it { is_expected.to validate_presence_of :shopify_domain }

  describe '#save' do
    subject(:shop) { create(:shop) }

    it 'create default bar' do
      expect(shop.bars.length).to eq(1)
    end

    it 'checks for duplicates' do
      is_expected
        .to validate_uniqueness_of(:shopify_domain)
        .ignoring_case_sensitivity
    end
  end
end
