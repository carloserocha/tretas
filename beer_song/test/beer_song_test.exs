defmodule BeerSongTest do
  use ExUnit.Case

  test "no number" do
    assert BeerSong.lyerics(0) == "No more bottles of beer on the wall, no more bottles of beer.
    Go to the store and buy some more, 99 bottles of beer on the wall."
  end

  test "number 1" do
    assert BeerSong.lyerics(1) == "1 bottles of beer on the wall, 1 bottles of beer.
    Take it down and pass it around, no more bottles of beer on the wall."
  end

  test "number 15" do
    assert BeerSong.lyerics(15) == "15 bottles of beer on the wall, 15 bottles of beer.
    Take one down and pass it around, 14 bottles of beer on the wall."
  end
end
