defmodule BeerSong do
  @moduledoc """
  Documentation for `BeerSong`.
  """

  @doc """
  Beer Song.

  ## Examples

      iex> BeerSong.lyerics()
      "No more bottles of beer on the wall, no more bottles of beer.
    Go to the store and buy some more, 99 bottles of beer on the wall."

  """

  def lyerics(0) do
    "No more bottles of beer on the wall, no more bottles of beer.
    Go to the store and buy some more, 99 bottles of beer on the wall."
  end

  def lyerics(1) do
    "1 bottles of beer on the wall, 1 bottles of beer.
    Take it down and pass it around, no more bottles of beer on the wall."
  end

  def lyerics(n) do
    "#{n} bottles of beer on the wall, #{n} bottles of beer.
    Take one down and pass it around, #{n-1} bottles of beer on the wall."
  end

end
