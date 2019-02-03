require 'rails_helper'

RSpec.describe Bar, type: :model do
  it { expect(FactoryBot.build(:bar)).to be_valid }

  it { is_expected.to validate_presence_of :title }
  it { is_expected.to validate_presence_of :page_template }
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

  it { is_expected.to validate_inclusion_of(:placement).in_array(%w(top bottom)) }
  it do
    is_expected.to validate_inclusion_of(:page_template)
      .in_array(%w(global homepage collection product cart))
  end
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

  context 'integer to decimal' do
    it '#opacity for :background_opacity' do
      expect(FactoryBot.build(:bar).opacity(95, :background_opacity).background_opacity).to eq(0.95)
    end

    it '#opacity for :text_opacity' do
      expect(FactoryBot.build(:bar).opacity(59, :text_opacity).text_opacity).to eq(0.59)
    end
  end

  context 'when :is_active updated' do
    let!(:bars) { FactoryBot.create(:shop_with_bars).bars }

    before do
      bars.first.update_columns(is_active: true)
      bars.second.update_columns(page_template: 'homepage', is_active: true)
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

    it 'when :is_active true and not :page_template global' do
      bars.last.update(is_active: true, page_template: 'homepage')
      expect(bars.first.is_active).to be false
      expect(bars.last.is_active).to be true
    end

    it 'when :is_active true and no matching :page_template' do
      bars.first.update_columns(page_template: 'cart')
      bars.last.update(is_active: true, page_template: 'homepage')
      expect(bars.first.is_active).to be true
      expect(bars.last.is_active).to be true
    end
  end
end
