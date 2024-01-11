//importando as dependencias

const bip32 = require('bip32')
const bip39 = require('bip39')
const bitcoin = require('bitcoinjs-lib')

//definir a rede
//bitcoin - rede principal - mainnet
//testnet  rede de teste - testnet

const network = bitcoin.networks.testnet

//derivação de carteiras HD
const path = `m/49'/1'/0'/0`
//const path = `m/49'/1'/0'/0` - testnet
//const path = `m/49'/0/0'/0` - mainnet

//criando o mnemonic para a seed (palavras de senha)
let mnemonic = bip39.generateMnemonic()
const seed = bip39.mnemonicToSeedSync(mnemonic)

//criando a raiz da carteira HD
let root = bip32.fromSeed(seed,network)

//criando uma conta - par de pvtppub keys
let account = root.derivePath(path)
let node = account.derive(0).derive(0)

let btcAddress = bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network: network,
}).address


console.log("Carteira gerada")
console.log("Endereço: ", btcAddress)
console.log("Chave privada:", node.toWIF())
console.log("Seed", mnemonic)


//site para verificar o endereço https://live.blockcypher.com/btc-testnet/address/mtJ8bLForiJRkeVWPTSWFk8rdaHCvhRX5y/
//envio de bitcoin https://coinfaucet.eu/en/btc-testnet/