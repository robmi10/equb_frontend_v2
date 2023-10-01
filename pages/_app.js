import "../styles/globals.css";
import EqubProvider from "@/components/context/context";
import { DAppProvider, Mumbai } from "@usedapp/core";
import Home from "../components/home/home";
import Navbar from "../components/navbar/navbar";
import Layout from "../components/layout/layout";
import { ChakraProvider } from "@chakra-ui/react";

const config = {
  networks: [Mumbai],
  readOnlyChainId: 80001,
  readOnlyUrls: {
    [80001]: `https://polygon-mumbai.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_PROJECT_ID}`,
  },
};

const App = ({ Component, pageProps }) => {
  return (
    <>
      <ChakraProvider>
        <DAppProvider config={config}>
          <EqubProvider>
            <Layout>
              <Navbar />
              <Component {...pageProps} />
            </Layout>
          </EqubProvider>
        </DAppProvider>
      </ChakraProvider>
    </>
  );
};
export default App;
