defmodule SpaceAge do
  @moduledoc """
  Documentation for `SpaceAges`.
  """

  @doc """
  Return the number of years of persona that has lives
  for 'seconds' aged on other planet.
  """
  @type planet ::
    :mercury
    | :venus
    | :earth
    | :mars
    | :jupiter
    | :saturn
    | :uranus
    | :neptune

  @orbital_periods %{
    earth: 1,
    mercury: 0.2408467,
    venus: 0.61519726,
    mars: 1.8808158,
    jupiter: 11.862615,
    saturn: 29.447498,
    uranus: 84.016846,
    neptune: 164.79132
  }
  
  @spec age_on(planet, pos_integer) :: float
  def age_on(planet, seconds) do
    earh_years(seconds) / @orbital_periods[planet]
  end
  
  @earth_year_in_seconds 31_557_600
  def earh_years(seconds) do
    seconds / @earth_year_in_seconds
  end
end
