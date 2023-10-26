const FetchOwners = async (req, res) => {
  try {
    const ownerAddress = req.body.ownerAddress;
    const QUERY = `
      query GetEqubCreateds($owner: String!) {
        equbs(where: { owner: $owner }) {
          id
          equbAddress
          owner
          equbStarted
          totalMembers
          equbEnded
          equbLength
          contributionAmount
          collateralAmount
          durationOfEachPeriod
        }
      }
    `;
    const response = await fetch(
      "http://127.0.0.1:8000/subgraphs/name/equb2",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          query: QUERY,
          variables: {
            owner: ownerAddress,
          },
        }),
      }
    );

    const result = await response.json();
    res.status(200).send({ message: "success", data: result });
  } catch (error) {
    res.status(500).send({ message: "error", data: error.message });
  }
};

export default FetchOwners;
