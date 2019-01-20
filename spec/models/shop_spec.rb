require 'rails_helper'
require 'support/shopify_test_helpers'

RSpec.describe Shop, type: :model do
  it { is_expected.to have_many(:bars) }

  describe '#save' do
    let!(:shop) { FactoryBot.create(:shop) }

    it 'create default bar' do
      expect(shop.bars.length).to eq(1)
    end
  end
end
