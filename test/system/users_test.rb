require 'application_system_test_case'

class UsersTest < ApplicationSystemTestCase
  test 'new user registration' do
    visit '/register'
    fill_in 'Email', with: 'foo@bar.com'
    fill_in 'Password', with: 'testpass'
    fill_in 'Password Confirmation', with: 'testpass'
    assert_difference 'User.count' do
      click_button 'Submit'
      assert_selector 'a', text: 'Logout'
    end
  end

  test 'user login' do
    user = create(:user)
    visit root_path
    click_on 'Login'
    fill_in 'Email', with: user.email
    fill_in 'Password', with: user.password
    click_on 'Submit'
    assert_selector 'a', text: 'Logout'
  end

  test 'user logout' do
    user = create(:user)
    login_as(user, scope: :user)
    visit root_path
    click_on 'Logout'
    assert_selector 'a', text: 'Login'
  end

  test 'reset user password' do
    user = create(:user)
    visit root_path
    click_on 'Login'
    click_on 'Forgot password'
    fill_in 'Email', with: user.email
    assert_difference 'ActionMailer::Base.deliveries.length' do
      click_on 'Send me reset password instructions'
      assert_selector 'h2', text: 'Log in'
    end
    last_email = ActionMailer::Base.deliveries.last
    assert_equal 'Reset password instructions', last_email.subject
    assert_equal [user.email], last_email.to
  end
end
