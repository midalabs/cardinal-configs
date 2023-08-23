pub mod errors;
pub mod instructions;
pub use instructions::*;
pub mod state;

pub use ::anchor_lang::prelude::*;

declare_id!("JAMgycWyKsvKDCHfEqGEfLSso1tRBcKMr5Xq6svD7Ce5");

#[program]
pub mod cardinal_configs {
    use super::*;

    pub fn init_config_entry<'key, 'accounts, 'remaining, 'info>(
        ctx: Context<'key, 'accounts, 'remaining, 'info, InitConfigEntryCtx<'info>>, 
        ix: InitConfigEntryIx
    ) -> Result<()> {        
        init_config_entry::handler(ctx, ix)
    }

    pub fn update_config_entry(ctx: Context<UpdateConfigEntryCtx>,ix: UpdateConfigEntryIx) -> Result<()> {
        update_config_entry::handler(ctx, ix)
    }
}