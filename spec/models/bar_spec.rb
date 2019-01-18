require 'rails_helper'

RSpec.describe Bar, type: :model do
  it { expect(FactoryBot.build(:bar)).to be_valid }

  it { is_expected.to validate_presence_of :title }
  it { is_expected.to validate_presence_of :content }
  it { is_expected.to validate_presence_of :bg_color }
  it { is_expected.to validate_presence_of :template_enabled }

  it { is_expected.to_not allow_value(nil).for(:content)}
  it { is_expected.to_not allow_value(nil).for(:is_new_tab_url) }
  it { is_expected.to_not allow_value(nil).for(:has_close_button) }
  it { is_expected.to_not allow_value(nil).for(:has_close_button) }

  it { is_expected.to validate_length_of(:content).is_at_least(0) }

  it { is_expected.to validate_inclusion_of(:position).in_array(%w(fixed static)) }
  it { is_expected.to validate_inclusion_of(:location).in_array(%w(top bottom)) }
  it { is_expected.to validate_inclusion_of(:template_enabled).in_array(%w(global homepage collection product)) }
end
