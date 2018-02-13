require 'rails_helper'

RSpec.describe "lists/edit", type: :view do
  before(:each) do
    @list = assign(:list, List.create!(
      :name => "MyString",
      :description => "MyText",
      :owner_id => 1
    ))
  end

  it "renders the edit list form" do
    render

    assert_select "form[action=?][method=?]", list_path(@list), "post" do

      assert_select "input[name=?]", "list[name]"

      assert_select "textarea[name=?]", "list[description]"

      assert_select "input[name=?]", "list[owner_id]"
    end
  end
end
