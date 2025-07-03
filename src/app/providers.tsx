'use client';

import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConnectKitProvider, getDefaultConfig } from 'connectkit';
import { createConfig, http } from 'wagmi';
import { baseSepolia } from 'wagmi/chains';

const config = createConfig(
  getDefaultConfig({
    chains: [ baseSepolia],
    transports: {
      [baseSepolia.id]: http(),
    },
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '',
    appName: 'All Base Cafe',
    appDescription: 'A creative community for coding, design, and art streams',
    appUrl: 'https://allbasecafe.com',
    appIcon: 'https://allbasecafe.com/Base_Cafe_Logo.png',
  })
);

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider theme="soft" mode="light">
          {children}
        </ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
} 