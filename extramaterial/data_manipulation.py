##Lectura de dataset de jugadores de NBA, drop de columnas y conversión a JSON para trabajar en JS con el.

import pandas as pd

nba_players_data = pd.read_csv("all_seasons.csv")

columns = ["player_name", "team_abbreviation", "age", "player_height", "player_weight", "pts", "reb", "ast", "season", "draft_year", "draft_number"]
nba_players_data = nba_players_data[columns]

##print(nba_players_data.head())

##nba_players_data.to_json("nba_players_data.json", orient="records", indent=4)

unique_seasons = nba_players_data["season"].unique()
print(unique_seasons)

unique_teams = nba_players_data["team_abbreviation"].unique()
print(unique_teams)

