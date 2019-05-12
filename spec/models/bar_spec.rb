require 'rails_helper'

RSpec.describe Bar, type: :model do
  it { is_expected.to validate_presence_of :title }
  it { is_expected.to validate_presence_of :page_templates }
  it { is_expected.to_not allow_value(nil).for(:is_active)}
  it { is_expected.to_not allow_value(nil).for(:is_sticky)}
  it { is_expected.to_not allow_value(nil).for(:is_new_tab_url) }
  it { is_expected.to_not allow_value(nil).for(:is_full_width_link) }
  it { is_expected.to_not allow_value(nil).for(:has_close_button) }
  it { is_expected.to allow_value('inherit').for(:font_size) }
  it { is_expected.to allow_value('15px').for(:font_size) }
  it { is_expected.to allow_value('15px').for(:padding_y) }
  it { is_expected.to allow_value('15px').for(:padding_x) }
  it { is_expected.to allow_value('15.5px').for(:font_size) }
  it { is_expected.to allow_value('15.5px').for(:padding_y) }
  it { is_expected.to allow_value('15.5px').for(:padding_x) }
  it { is_expected.to_not allow_value(15).for(:font_size) }  
  it { is_expected.to_not allow_value(15).for(:padding_y) }
  it { is_expected.to_not allow_value(15).for(:padding_x) }
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

  it { is_expected.to validate_inclusion_of(:placement).in_array(Bar::PLACEMENT) }
  it { is_expected.to validate_inclusion_of(:background_image_repeat).in_array(Bar::BACKGROUND_IMAGE_REPEAT) }
  it { is_expected.to validate_inclusion_of(:text_align).in_array(Bar::TEXT_ALIGN) }

  context 'when not valid url' do
    it 'with space' do
      expect(FactoryBot.build(:bar, url: 'url space.com')).to_not be_valid
    end

    it 'no tld' do
      expect(FactoryBot.build(:bar, url: 'no dot com')).to_not be_valid
    end
  end

  it { is_expected.to belong_to(:shop) }

  context 'when :is_active updated' do
    let!(:bars) { FactoryBot.create(:shop_with_bars).bars }

    before do
      bars.first.update_columns(is_active: true)
      bars.second.update_columns(page_templates: ['homepage'], is_active: true)
    end

    it 'when :is_active true' do
      bars.last.update(is_active: true)
      expect(bars.first.is_active).to be false
      expect(bars.second.is_active).to be false
      expect(bars.last.is_active).to be true
    end

    it 'when :is_active false' do
      bars.last.update_columns(is_active: false)
      bars.last.update(is_active: false)
      expect(bars.first.is_active).to be true
      expect(bars.last.is_active).to be false
    end

    it 'when :is_active true and not :page_templates [global]' do
      bars.last.update(is_active: true, page_templates: ['homepage'])
      expect(bars.first.is_active).to be false
      expect(bars.last.is_active).to be true
    end

    it 'when :is_active true and no matching :page_templates' do
      bars.first.update_columns(page_templates: ['cart'])
      bars.last.update(is_active: true, page_templates: ['homepage'])
      expect(bars.first.is_active).to be true
      expect(bars.last.is_active).to be true
    end
  end
end
