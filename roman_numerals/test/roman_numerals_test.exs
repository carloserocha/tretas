defmodule RomanTest do
  use ExUnit.Case
  doctest Roman

  test "convert number to roman numbers 6" do
    assert Roman.numerals(6) == "VI"
  end
  test "convert number to roman numbers 15" do
    assert Roman.numerals(15) == "XV"
  end
  test "convert number to roman numbers: 100" do
    assert Roman.numerals(100) == "C"
  end
  test "convert number to roman numbers 159" do
    assert Roman.numerals(159) == "CLIX"
  end
end
