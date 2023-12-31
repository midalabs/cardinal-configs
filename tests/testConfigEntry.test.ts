import { executeTransaction } from "@cardinal/common";
import { SystemProgram, Transaction } from "@solana/web3.js";

import {
  configsProgram,
  findConfigEntryId,
  getConfigEntry,
} from "../src/programs";
import type { CardinalProvider } from "./workspace";
import { getProvider } from "./workspace";

describe("Create config entry", () => {
  const configEntryName = `config-entry-${Math.random()}`;
  let provider: CardinalProvider;

  it("Init config entry", async () => {
    provider = await getProvider();
    const program = configsProgram(provider.connection);

    const transaction = new Transaction();
    const configEntryId = findConfigEntryId(
      Buffer.from("", "utf-8"),
      Buffer.from(configEntryName, "utf-8")
    );
    const ix = await program.methods
      .initConfigEntry({
        prefix: Buffer.from(""),
        key: Buffer.from(configEntryName),
        value: "value",
        extends: [],
      })
      .accountsStrict({
        configEntry: configEntryId,
        authority: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .instruction();
    transaction.instructions.push(ix);

    await executeTransaction(provider.connection, transaction, provider.wallet);

    const configEntryData = await getConfigEntry(
      provider.connection,
      Buffer.from("", "utf-8"),
      Buffer.from(configEntryName, "utf-8")
    );

    expect(configEntryData.parsed.key).toEqual(configEntryName);
    expect(configEntryData.parsed.value).toEqual("value");
  });

  it("Update config entry", async () => {
    const program = configsProgram(provider.connection);

    const transaction = new Transaction();
    const configEntryId = findConfigEntryId(
      Buffer.from("", "utf-8"),
      Buffer.from(configEntryName, "utf-8")
    );
    const ix = await program.methods
      .updateConfigEntry({
        value: "150",
        extends: [],
        append: false,
      })
      .accountsStrict({
        configEntry: configEntryId,
        authority: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .instruction();
    transaction.instructions.push(ix);

    await executeTransaction(provider.connection, transaction, provider.wallet);

    const configEntryData = await getConfigEntry(
      provider.connection,
      Buffer.from("", "utf-8"),
      Buffer.from(configEntryName, "utf-8")
    );

    expect(configEntryData.parsed.key).toEqual(configEntryName);
    expect(configEntryData.parsed.value).toEqual("150");
  });
});
