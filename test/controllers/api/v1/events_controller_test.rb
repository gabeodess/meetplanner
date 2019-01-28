require 'test_helper'

class Api::V1::EventsControllerTest < ActionDispatch::IntegrationTest
  test 'should create' do
    @user = FactoryBot.create(:user)
    sign_in(@user)
    assert_difference '@user.events.count' do
      post api_v1_events_url, params: { event: {
        title: 'foobar',
        fee: 0,
        start_on: Date.today,
        sanction_id: :foobar,
        organizer: :foobar,
        description: :foobar,
        street: :foobar,
        city: :foobar,
        state: :foobar,
        zipcode: '01060',
        phone: '413-323-2343',
        email: 'foo@bar.com'
      } }
      assert_response :success
    end
  end

  test 'should get index' do
    sign_in(FactoryBot.create(:user))
    get api_v1_events_url
    assert_response :success
  end
end
