import type { ParsedIdlAccountData } from "@cardinal/common";
import { emptyWallet } from "@cardinal/common";
import { Program } from "@project-serum/anchor";
import type { Wallet } from "@project-serum/anchor/dist/cjs/provider";
import { AnchorProvider } from "@project-serum/anchor/dist/cjs/provider";
import type { ConfirmOptions, Connection } from "@solana/web3.js";
import { PublicKey } from "@solana/web3.js";

import * as CONFIGS_TYPES from "../idl/cardinal_configs";

export const configs_ADDRESS = new PublicKey(
  "cosTRGbPdRwuyAnWXQ8H7rNXZNXvsQ3nbvzGd9BdvoT"
);

export const CONFIG_ENTRY_SEED = "config-entry";

export type CONFIGS_PROGRAM = CONFIGS_TYPES.CardinalConfigs;

export const CONFIGS_IDL = CONFIGS_TYPES.IDL;

export type StorageEntryData = ParsedIdlAccountData<
  "configEntry",
  CONFIGS_PROGRAM
>;

export const configsProgram = (
  connection: Connection,
  wallet?: Wallet,
  confirmOptions?: ConfirmOptions
) => {
  return new Program<CONFIGS_PROGRAM>(
    CONFIGS_IDL,
    configs_ADDRESS,
    new AnchorProvider(
      connection,
      wallet ?? emptyWallet(PublicKey.default),
      confirmOptions ?? {}
    )
  );
};
