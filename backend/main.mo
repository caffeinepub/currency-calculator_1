import OutCall "http-outcalls/outcall";

actor {
  public query func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };

  public shared ({ caller }) func fetchExchangeRates() : async Text {
    // Using a demonstration endpoint that does not require an API key.
    let url = "https://demo-api.coin-stats.com/v6/swagger.json";
    await OutCall.httpGetRequest(url, [], transform);
  };
};
