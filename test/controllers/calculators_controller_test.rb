require 'test_helper'

class CalculatorsControllerTest < ActionDispatch::IntegrationTest
  test 'get show' do
    get calculator_path
    assert_response :success
  end
end
