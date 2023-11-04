const FetchEqubs = async (req, res) => {
    try {
      const QUERY = `
      {
        equbs {
          id
          equbStarted
          equbLength
          equbEnded
          equbAddress
          durationOfEachPeriod
          owner
          timeStamp
          totalMembers
          collateralAmount
          contributionAmount
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
          }),
        }
      );
  
      const result = await response.json();
      res.status(200).send({ message: "success", data: result });
    } catch (error) {
      res.status(500).send({ message: "error", data: error.message });
    }
  };
  
  export default FetchEqubs;
  