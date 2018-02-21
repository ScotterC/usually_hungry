require 'rails_helper'

RSpec.describe "ListItems", type: :request do
  describe "GET /list/1/items/new" do
    before :each do
      @list = create(:list)
    end

    it "works! (now write some real specs)" do
      get new_list_item_path(@list.id)
      expect(response).to have_http_status(200)
    end
  end
end
