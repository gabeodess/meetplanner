require 'test_helper'

class Api::V1::SessionsControllerTest < ActionDispatch::IntegrationTest
  test 'should get current_user' do
    get api_v1_sessions_current_user_url
    assert_response :success
  end
end
