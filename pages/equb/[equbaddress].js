import { useRouter } from "next/router";
import Equb from "./components/equbdetails"
import { useQuery } from "@apollo/client";
import { GET_EQUBS_INFO } from "@/components/apollo";
import BouncerLoader from "@/components/animation/bouncer";

const Index = () => {

  const router = useRouter();
  const { equbaddress: EqubParam } = router.query



  const { data: equbInfoQuery, loading: equbQueryInfoIsLoading, error: equbInfoQueryError, refetch: refetchEqubInfoQuery } = useQuery(GET_EQUBS_INFO, {
    variables: { equb: EqubParam },
  });

  if (equbInfoQueryError) return <> <p> Error...</p></>
  if (equbQueryInfoIsLoading)
    return (
      <div className='h-screen flex justify-center items-center'>
        <BouncerLoader />
      </div>
    );

  const { equbs: equbsInfo } = equbInfoQuery
  const cycleId = equbsInfo[0]?.currentWeekOrMonth


  return (
    <Equb equbAddress={EqubParam} cycleId={cycleId} />
  )

}

export default Index