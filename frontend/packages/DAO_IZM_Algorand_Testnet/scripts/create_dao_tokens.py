
# W♾️W and IZM$ token creation for Algorand Testnet using Algorand Python SDK
# Prerequisites: pip install py-algorand-sdk

from algosdk import account, algod, transaction
from algosdk.v2client import algod

ALGOD_ADDRESS = "https://testnet-api.algonode.cloud"
ALGOD_TOKEN = ""  # No token needed for Algonode public endpoint

# Create client
client = algod.AlgodClient(ALGOD_TOKEN, ALGOD_ADDRESS)

# Your testnet account mnemonic here (make sure it’s funded with TestAlgo from a dispenser)
mnemonic_phrase = "your 25-word mnemonic here"
from algosdk import mnemonic
private_key = mnemonic.to_private_key(mnemonic_phrase)
account_address = account.address_from_private_key(private_key)

# Token details
def create_asset(name, unit_name, total, decimals=0):
    txn = transaction.AssetConfigTxn(
        sender=account_address,
        sp=client.suggested_params(),
        total=total,
        default_frozen=False,
        unit_name=unit_name,
        asset_name=name,
        manager=account_address,
        reserve=account_address,
        freeze=None,
        clawback=None,
        url="https://daoizm.xyz",
        decimals=decimals
    )
    signed_txn = txn.sign(private_key)
    txid = client.send_transaction(signed_txn)
    print(f"{name} ({unit_name}) creation transaction ID: {txid}")

# Create W♾️W (non-transferable: use metadata in DAO logic)
create_asset("Flow-State Token", "W∞W", 10000)

# Create IZM$ (fungible token)
create_asset("DAO IZM Token", "IZM$", 1000000)
