require 'rails_helper'

describe 'DestroyBar', type: :mutation do
  let!(:mutation_string) do
    'mutation DestroyBar($input: DestroyBarInput!) { destroyBar(input: $input) { bar { id } } }'
  end

  describe 'destroy mutation' do
    context 'when valid' do
      it 'decreases bar count' do
        bar = create(:bar)

        expect do
          mutation mutation_string,
            variables: { input: { id: bar.id } },
            operation_name: 'DestroyBar'
        end.to change(Bar, :count).by(-1)
      end
    end

    context 'when not valid' do
      def not_taken_bar_id
        create(:bar)
        Bar.last.id + 100
      end

      it 'responds with nil' do
        mutation mutation_string,
          variables: { input: { id: not_taken_bar_id } },
          operation_name: 'DestroyBar'
        expect(gql_response.data['destroyBar']['bar']).to be_nil
      end

      it 'does not decrease bar count' do
        bar_id = not_taken_bar_id

        expect do
          mutation mutation_string,
            variables: { input: { id: bar_id } },
            operation_name: 'DestroyBar'
        end.to_not change(Bar, :count)
      end
    end
  end
end
