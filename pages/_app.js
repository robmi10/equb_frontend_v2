import "../styles/globals.css";
import EqubProvider from "@/components/context/context";
import { DAppProvider, Mumbai } from "@usedapp/core";
import Navbar from "../components/navbar/navbar";
import Layout from "../components/layout/layout";
import { ChakraProvider } from "@chakra-ui/react";
import { ApolloProvider } from '@apollo/client';
import { client } from "./apollo-client";
import { Footer } from "@/components/footer/footer";

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
          <ApolloProvider client={client}>
            <EqubProvider>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </EqubProvider>
          </ApolloProvider>
        </DAppProvider>
      </ChakraProvider>
    </>
  );
};
export default App;
