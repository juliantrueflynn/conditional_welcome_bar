require 'rails_helper'

RSpec.describe Bar, type: :model do
  it { expect(FactoryBot.build(:bar)).to be_valid }

  it { is_expected.to validate_presence_of :title }
  it { is_expected.to validate_presence_of :content }
  it { is_expected.to validate_presence_of :template_enabled }

  it { is_expected.to_not allow_value(nil).for(:content)}
  it { is_expected.to_not allow_value(nil).for(:is_sticky)}
  it { is_expected.to_not allow_value(nil).for(:is_new_tab_url) }
  it { is_expected.to_not allow_value(nil).for(:has_close_button) }
  it { is_expected.to_not allow_value(nil).for(:has_close_button) }

  it { is_expected.to validate_length_of(:content).is_at_least(0) }

  it { is_expected.to validate_inclusion_of(:placement).in_array(%w(top bottom)) }
  it { is_expected.to validate_inclusion_of(:template_enabled).in_array(%w(global homepage collection product)) }

  context 'when not valid url' do
    it 'with space' do
      expect(FactoryBot.build(:bar, url: 'url space.com')).to_not be_valid
    end

    it 'no tld' do
      expect(FactoryBot.build(:bar, url: 'no dot com')).to_not be_valid
    end
  end
end
