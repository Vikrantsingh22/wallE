"use client";

import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { mainnet, polygon, optimism, arbitrum, base } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import "@rainbow-me/rainbowkit/styles.css";

const config = getDefaultConfig({
  appName: "WallE - Social DeFi Platform",
  projectId:
    process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || "fallback-project-id",
  chains: [mainnet, polygon, optimism, arbitrum, base],
  ssr: true,
});

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={{
            colors: {
              accentColor: "#7C3AED",
              accentColorForeground: "white",
              actionButtonBorder: "rgba(255, 255, 255, 0.04)",
              actionButtonBorderMobile: "rgba(255, 255, 255, 0.06)",
              actionButtonSecondaryBackground: "rgba(255, 255, 255, 0.08)",
              closeButton: "rgba(224, 232, 255, 0.6)",
              closeButtonBackground: "rgba(255, 255, 255, 0.08)",
              connectButtonBackground: "#7C3AED",
              connectButtonBackgroundError: "#FF494A",
              connectButtonInnerBackground:
                "linear-gradient(0deg, rgba(255, 255, 255, 0.075), rgba(255, 255, 255, 0.15))",
              connectButtonText: "#FFF",
              connectButtonTextError: "#FFF",
              connectionIndicator: "#30E000",
              downloadBottomCardBackground:
                "linear-gradient(126deg, rgba(255, 255, 255, 0) 9.49%, rgba(171, 171, 171, 0.04) 71.04%), #1A1B1F",
              downloadTopCardBackground:
                "linear-gradient(126deg, rgba(171, 171, 171, 0.2) 9.49%, rgba(255, 255, 255, 0) 71.04%), #1A1B1F",
              error: "#FF494A",
              generalBorder: "rgba(255, 255, 255, 0.08)",
              generalBorderDim: "rgba(255, 255, 255, 0.05)",
              menuItemBackground: "rgba(224, 232, 255, 0.1)",
              modalBackdrop: "rgba(0, 0, 0, 0.3)",
              modalBackground: "#1A1B1F",
              modalBorder: "rgba(255, 255, 255, 0.08)",
              modalText: "#FFF",
              modalTextDim: "rgba(224, 232, 255, 0.3)",
              modalTextSecondary: "rgba(255, 255, 255, 0.6)",
              profileAction: "#FFF",
              profileActionHover: "rgba(255, 255, 255, 0.2)",
              profileForeground: "#1A1B1F",
              selectedOptionBorder: "rgba(224, 232, 255, 0.1)",
              standby: "#FFD641",
            },
          }}
          modalSize="compact"
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
