require 'test_helper'

class Api::V1::SessionsControllerTest < ActionDispatch::IntegrationTest
  test 'should get current_user' do
    sign_in FactoryBot.create(:user)
    get api_v1_sessions_current_url
    assert_response :success
  end
end
