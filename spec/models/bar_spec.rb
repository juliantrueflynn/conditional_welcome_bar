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
  it { is_expected.to allow_value('15px').for(:font_size) }
  it { is_expected.to allow_value('15px').for(:padding_top) }
  it { is_expected.to allow_value('15px').for(:padding_right) }
  it { is_expected.to allow_value('15px').for(:padding_bottom) }
  it { is_expected.to allow_value('15px').for(:padding_left) }
  it { is_expected.to allow_value('15.5px').for(:font_size) }
  it { is_expected.to allow_value('15.5px').for(:padding_top) }
  it { is_expected.to allow_value('15.5px').for(:padding_right) }
  it { is_expected.to allow_value('15.5px').for(:padding_bottom) }
  it { is_expected.to allow_value('15.5px').for(:padding_left) }
  it { is_expected.to_not allow_value(15).for(:font_size) }  
  it { is_expected.to_not allow_value(15).for(:padding_top) }
  it { is_expected.to_not allow_value(15).for(:padding_right) }
  it { is_expected.to_not allow_value(15).for(:padding_bottom) }
  it { is_expected.to_not allow_value(15).for(:padding_left) }
  it { is_expected.to validate_length_of(:content).is_at_least(0) }

  it do
    is_expected.to validate_numericality_of(:text_opacity)
      .is_less_than_or_equal_to(1)
      .is_greater_than_or_equal_to(0)
  end

  it do
    is_expected.to validate_numericality_of(:background_opacity)
      .is_less_than_or_equal_to(1)
      .is_greater_than_or_equal_to(0)
  end

  it { is_expected.to validate_inclusion_of(:placement).in_array(%w(top bottom)) }
  it { is_expected.to validate_inclusion_of(:template_enabled).in_array(%w(global homepage collection product)) }
  it { is_expected.to validate_inclusion_of(:background_image_repeat).in_array(%w(no-repeat repeat-x repeat-y repeat space))}
  it { is_expected.to validate_inclusion_of(:text_align).in_array(%w(center left right)) }

  context 'when not valid url' do
    it 'with space' do
      expect(FactoryBot.build(:bar, url: 'url space.com')).to_not be_valid
    end

    it 'no tld' do
      expect(FactoryBot.build(:bar, url: 'no dot com')).to_not be_valid
    end
  end

  it { is_expected.to belong_to(:shop) }
end
