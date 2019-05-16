require 'rails_helper'

describe 'UpdateBar', type: :mutation do
  let!(:mutation_string) do
    names = Bar.updatableable_columns
    columns = names.map { |name| name.camelize(:lower) }.join(' ')
    "mutation UpdateBar($input: UpdateBarInput!) { updateBar(input: $input) { bar { #{columns} } errors { #{columns} } } }"
  end

  describe 'update mutation' do
    context 'when valid' do
      it 'responds with no errors' do
        mutation mutation_string,
          variables: { input: { id: create(:bar).id, title: 'New title' } },
          operation_name: 'UpdateBar'
        errors = gql_response.data['updateBar']['errors']
        expect(errors.each_value.any?(&:present?)).to be false
      end

      it 'has changed title' do
        mutation mutation_string,
          variables: { input: { id: create(:bar).id, title: 'New title' } },
          operation_name: 'UpdateBar'
        expect(gql_response.data['updateBar']['bar']['title']).to eq('New title')
      end
    end

    context 'when not valid' do
      it 'responds with errors' do
        mutation mutation_string,
          variables: { input: { id: create(:bar).id, title: nil } },
          operation_name: 'UpdateBar'
        errors = gql_response.data['updateBar']['errors']
        expect(errors.each_value.any?(&:present?)).to be true
      end
    end
  end
end
