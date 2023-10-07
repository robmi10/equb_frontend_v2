const FetchOwners = async (req, res) => {
  try {
    const ownerAddress = req.body.ownerAddress;
    const QUERY = `
      query GetEqubCreateds($owner: String!) {
        equbCreateds(where: { owner: $owner }) {
          id
          equbAddress
          blockNumber
          owner
        }
      }
    `;
    const response = await fetch(
      "https://api.studio.thegraph.com/query/47164/equbv2/v0.0.1",
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
