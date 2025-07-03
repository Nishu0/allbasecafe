import { getDefaultConfig } from 'connectkit';
import { createConfig } from 'wagmi';
import { base, baseSepolia } from 'wagmi/chains';

export const config = createConfig(
  getDefaultConfig({
    appName: 'allbasecafe',
    chains: [baseSepolia, base],
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
  })
);

declare module 'wagmi' {
  interface Register {
    config: typeof config;
  }
}