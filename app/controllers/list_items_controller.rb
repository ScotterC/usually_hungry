class ListItemsController < ApplicationController
  before_action :set_list
  before_action :set_list_item, only: [:show, :edit, :update, :destroy]

  # GET /list/1/items
  def index
    @list_items = ListItem.all
  end

  # GET /list/1/items/1
  def show
  end

  # GET /list/1/items/new
  def new
    @list_item = ListItem.new
  end

  # GET /list_items/1/edit
  def edit
  end

  # POST /list_items
  def create
    # params[:list_id]
    @list_item = ListItem.new(list_item_params)

    if @list_item.save
      redirect_to @list, notice: 'List item was successfully created.'
    else
      render :new
    end
  end

  # PATCH/PUT /list_items/1
  def update
    if @list_item.update(list_item_params)
      redirect_to [@list, @list_item], notice: 'List item was successfully updated.'
    else
      render :edit
    end
  end

  # DELETE /list_items/1
  def destroy
    @list_item.destroy
    redirect_to list_list_items_url(@list), notice: 'List item was successfully destroyed.'
  end

  private
    def set_list
      @list = List.find(params[:list_id])
    end

    # Use callbacks to share common setup or constraints between actions.
    def set_list_item
      @list_item = ListItem.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def list_item_params
      params.require(:list_item).permit(:list_id, :name, :description)
    end
end
