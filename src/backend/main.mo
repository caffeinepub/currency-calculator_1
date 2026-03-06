import OutCall "http-outcalls/outcall";
import Map "mo:core/Map";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Nat "mo:core/Nat";
import Principal "mo:core/Principal";

actor {
  public type RawLeague = {
    idLeague : Text;
    strLeague : Text;
    strSport : Text;
    strLeagueAlternate : Text;
  };

  public type Event = {
    id : Text;
    name : Text;
    leagueId : Text;
    sport : Text;
    date : Text;
    time : ?Text;
    status : Text;
    homeTeam : ?Text;
    awayTeam : ?Text;
    homeScore : ?Nat;
    awayScore : ?Nat;
  };

  public type Standing = {
    teamId : Text;
    rank : Nat;
    teamName : Text;
    points : Int;
    gamesPlayed : Nat;
    wins : Nat;
    draws : Nat;
    losses : Nat;
    goalsFor : Nat;
    goalsAgainst : Nat;
    goalDifference : Int;
  };

  public type League = {
    id : Text;
    name : Text;
    sport : Text;
    alternateName : ?Text;
  };

  type CachedData = {
    data : Text;
    timestamp : Int;
  };

  let cache = Map.empty<Text, CachedData>();
  var cacheTimeout = 3600000000000;

  public query func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };

  func cacheKey(key : Text) : Text {
    "sports_tracker_" # key;
  };

  public shared ({ caller }) func setCacheTimeout(hours : Nat) : async () {
    checkAdmin(caller);
    cacheTimeout := hours * 3600000000000;
  };

  func checkAdmin(_caller : Principal) {
    return;
  };

  public shared ({ caller }) func getAllLeagues() : async Text {
    let key = cacheKey("all_leagues");
    switch (cache.get(key)) {
      case (?cached) {
        if (Time.now() - cached.timestamp < cacheTimeout) {
          return cached.data;
        };
      };
      case (null) {};
    };

    let url = "https://www.thesportsdb.com/api/v1/json/3/all_leagues.php";
    let result = await OutCall.httpGetRequest(url, [], transform);

    cache.add(
      key,
      {
        data = result;
        timestamp = Time.now();
      },
    );
    result;
  };

  public shared ({ caller }) func getEventsForToday() : async Text {
    let key = cacheKey("events_today");
    switch (cache.get(key)) {
      case (?cached) {
        if (Time.now() - cached.timestamp < cacheTimeout) {
          return cached.data;
        };
      };
      case (null) {};
    };

    let url = "https://www.thesportsdb.com/api/v1/json/3/eventsnow.php";
    let result = await OutCall.httpGetRequest(url, [], transform);
    cache.add(
      key,
      {
        data = result;
        timestamp = Time.now();
      },
    );
    result;
  };

  public shared ({ caller }) func getLeagueStandings(leagueId : Text, season : Text) : async Text {
    let key = cacheKey("standings_" # leagueId # "_" # season);
    switch (cache.get(key)) {
      case (?cached) {
        if (Time.now() - cached.timestamp < cacheTimeout) {
          return cached.data;
        };
      };
      case (null) {};
    };

    let url = "https://www.thesportsdb.com/api/v1/json/3/lookuptable.php?l=" # leagueId # "&s=" # season;
    let result = await OutCall.httpGetRequest(url, [], transform);
    cache.add(
      key,
      {
        data = result;
        timestamp = Time.now();
      },
    );
    result;
  };
};
