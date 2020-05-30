defmodule SpaceagesTest do
  use ExUnit.Case
  doctest Spaceages

  test "greets the world" do
    assert Spaceages.hello() == :world
  end
end
