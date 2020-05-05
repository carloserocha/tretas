defmodule Roman do
  @moduledoc """
  Documentation for `Roman`.
  """

  @doc """
  Convert the number to a roman number

  ## Examples
      iex> Roman.numerals(5)
      "V"
  """
  @letters %{
    1 => "I",
    4 => "IV",
    5 => "V",
    9 => "IX",
    10 => "X",
    40 => "XL",
    50 => "L",
    90 => "XC",
    100 => "C",
    400 => "CD",
    500 => "D",
    900 => "CM",
    1000 => "M",
  }

  # orderar Map
  @letter Map.keys(@letters) |> Enum.sort(& (&1 > &2))

  def numerals(number) do
    to_letters(@letter, number, "")
  end

  def to_letters(_, 0, result) do
    result 
  end

  # pattern matching
  def to_letters([head | tail]=keys, number, result) do
    if number >= head do
      to_letters(keys, number - head, result <> @letters[head])
    else
      to_letters(tail, number, result)
    end
  end
end
