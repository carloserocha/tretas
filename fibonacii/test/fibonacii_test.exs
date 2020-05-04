defmodule FibonaciiTest do
  use ExUnit.Case, async: true

  test "fibonacci receives 0 and returns 10" do
    assert Fibonacii.fib(0) == 0
  end
  test "fibonacci receives 1 and returns 1" do
    assert Fibonacii.fib(1) == 1
  end
  test "fibonacci receives 16 and returns 987" do
    assert Fibonacii.fib(16) == 987
  end
end