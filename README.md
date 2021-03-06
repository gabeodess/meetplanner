# README

This README documents the steps that are necessary to get the
application up and running.

## Getting Started
- `bundle install`
- `yarn install`
- `rails db:setup`
- `rails server`
- `open http://localhost:3000`

### Husky
This project uses [Husky](https://github.com/typicode/husky) to manage git hooks.
If you already have a hook defined in `.git/hooks/` then husky will not install the hooks for you.
In this case you will need to remove the hooks first and re-install Husky:
- `rm .git/hooks/pre-commit`
- `rm .git/hooks/pre-push`
- `yarn add husky`

## Test Suite
Tests are written using Test::Unit and Capybara.
- `rake test test:system`

After running the entire test suite you can explore the test coverage:
- `open coverage/index.html`
