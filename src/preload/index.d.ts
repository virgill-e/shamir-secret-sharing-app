import { ElectronAPI } from '@electron-toolkit/preload'

interface ShamirAPI {
  split: (
    secret: string,
    shares: number,
    threshold: number
  ) => Promise<{ success: boolean; shares?: string[]; error?: string }>
  combine: (shares: string[]) => Promise<{ success: boolean; secret?: string; error?: string }>
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      shamir: ShamirAPI
    }
  }
}
