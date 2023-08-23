.PHONY: install test-keys build start test clean-test-keys stop

all: install build start test stop

keys: 
	solana-keygen new -s -o keypairs/program-id.json
	solana-keygen new -s -o keypairs/update-authority.json
	
	solana-keygen pubkey keypairs/program-id.json
	solana-keygen pubkey keypairs/update-authority.json

install:
	yarn install

clean:
	rm -rf target

build:
	anchor build
	yarn idl:generate

deploy:
	solana airdrop 20 --url localhost keypairs/update-authority.json
	solana program deploy --url localhost --keypair ./keypairs/update-authority.json --program-id ./keypairs/program-id.json ./target/deploy/cardinal_configs.so
	solana balance keypairs/update-authority.json

start:
	solana-test-validator --url https://api.mainnet-beta.solana.com \
		--bpf-program cnf9Q2MmjDVbzX1kjr8tEEtPJyB4e1avEuBMzWygnWo ./target/deploy/cardinal_configs.so \
		--reset --quiet & echo $$!
	sleep 10

test:
	yarn test

stop:
	pkill solana-test-validator