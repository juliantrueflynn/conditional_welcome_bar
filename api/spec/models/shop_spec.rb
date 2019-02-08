require 'rails_helper'

RSpec.describe Shop, type: :model do
  it { is_expected.to have_many(:bars) }
  it { is_expected.to validate_presence_of :shopify_token }
  it { is_expected.to validate_presence_of :shopify_domain }

  describe 'uniqueness' do
    subject { FactoryBot.create(:shop) }
    it { is_expected.to validate_uniqueness_of :shopify_domain }
  end

  describe '#save' do
    let!(:shop) { FactoryBot.create(:shop) }

    it 'create default bar' do
      expect(shop.bars.length).to eq(1)
    end
  end
end
