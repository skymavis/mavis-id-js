import { Button, Link, ProgressCircleLoader, TextField, Typo } from "@axieinfinity/ronin-ui"
import { useWalletgo } from "@roninnetwork/walletgo"
import { useState } from "react"
import { addressConfig } from "src/config/address"
import { AXS__factory } from "src/contracts"
import { useGlobalToast } from "src/hooks/useToast"
import { HARDCODE_ADDRESS } from "src/utils/address"
import { fromFracAmount } from "src/utils/currency"
import { debugError } from "src/utils/debug"

import { Card } from "../Card"
import { Divider } from "../Divider"
import { ResultBox } from "../ResultBox"

export const TransferAxs = () => {
  const { walletProvider, account } = useWalletgo()
  const { showError, showSuccess } = useGlobalToast()

  const [toAddress, setToAddress] = useState<string>(HARDCODE_ADDRESS)
  const [axsAmount, setAxsAmount] = useState<string>("0.1")
  const [txHash, setTxHash] = useState<string>()
  const [loading, setLoading] = useState<boolean>(false)

  const handleTransferAxs = async () => {
    if (!walletProvider || !account) {
      showError("Please connect your wallet first!")
      return
    }

    setLoading(true)

    try {
      const rawAmount = fromFracAmount(axsAmount, 18)

      const contract = AXS__factory.connect(addressConfig.axs, walletProvider.getSigner())

      const txData = await contract.transfer(toAddress, rawAmount)

      setTxHash(txData.hash)
      showSuccess(`Transfer ${axsAmount} AXS successfully!`)

      setLoading(false)
    } catch (error) {
      debugError("handleTransferAxs", error)
      showError()

      setLoading(false)
    }
  }

  return (
    <>
      <Card>
        <Typo level="display-sm">transfer erc20 | eth_sendTransaction</Typo>
        <Typo dim className="mt-4 italic" level="body-sm">
          Transfer your AXS to another wallet.
        </Typo>

        <TextField
          value={axsAmount}
          onChange={event => {
            setAxsAmount(event.target.value)
          }}
          type="number"
          placeholder="AXS Amount"
          className="mt-20"
        />

        <TextField
          value={toAddress}
          onChange={event => {
            setToAddress(event.target.value)
          }}
          placeholder="To Address"
          className="mt-20"
        />

        <Button
          fullWidth
          label="Transfer AXS"
          onClick={handleTransferAxs}
          className="mt-20"
          disabled={!account || loading}
          customRightIcon={
            loading ? <ProgressCircleLoader className="ml-12" size="sm" /> : undefined
          }
        />

        <Divider />

        <Typo level="body-md-strong">Result</Typo>
        <ResultBox className="mt-8">
          {txHash ? (
            <Link
              href={`https://saigon-app.roninchain.com/tx/${txHash}`}
              level="body-md-strong"
              target="_blank"
              className="block truncate"
            >
              {txHash}
            </Link>
          ) : (
            "--"
          )}
        </ResultBox>
      </Card>
    </>
  )
}
