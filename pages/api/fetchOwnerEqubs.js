const FetchOwners = async (req, res) => {
  try {
    const ownerAddress = req.body.ownerAddress;
    console.log({ ownerAddressCheck: ownerAddress });
    const response = await fetch(
      "https://api.studio.thegraph.com/query/47164/equbv2/v0.0.1",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          query: ` {
            equbCreateds(
              where: {owner: "0x62d95f19dd724d0c0203d046a8ed7090d01fed1b"}
            ) {
              id
              equbAddress
              blockNumber
              owner
            }
          }`,
          variables: {
            ownerAddress: ownerAddress,
          },
        }),
      }
    );

    const result = await response.json();
    console.log({ resCheck: res });
    res.status(200).send({ message: "success", data: result });
  } catch (error) {
    res.status(500).send({ message: "error", data: error.message });
  }
};

export default FetchOwners;
