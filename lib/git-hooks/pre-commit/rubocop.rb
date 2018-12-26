#!/usr/bin/env ruby

require 'english'
require 'rubocop'

ADDED_OR_MODIFIED = /A|AM|^M/.freeze

changed_files = `git status --porcelain`
  .split(/\n/)
  .select { |file_name_with_status| file_name_with_status =~ ADDED_OR_MODIFIED }
  .map { |file_name_with_status| file_name_with_status.split(' ')[1] }
  .select { |file_name| File.extname(file_name) == '.rb' }
  .join(' ')

system("rubocop #{changed_files}") unless changed_files.empty?

exit $CHILD_STATUS.to_s[-1].to_i
