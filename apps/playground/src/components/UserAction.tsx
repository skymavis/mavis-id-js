import { ApproveAxs } from "./user-action/ApproveAxs"
import { AtiaActivation } from "./user-action/AtiaActivation"
import { GetAddress } from "./user-action/GetAddress"
import { GetRonBalance } from "./user-action/GetRonBalance"
import { PersonalSign } from "./user-action/PersonalSign"
import { SignTypedDataV4 } from "./user-action/SignTypedData"
import { StakingAxs } from "./user-action/StakingAxs"
import { SwapAxsOnKatana } from "./user-action/SwapAxsOnKatana"
import { TransferAxs } from "./user-action/TransferAxs"
import { TransferRon } from "./user-action/TransferRon"

export const UserAction = () => (
  <>
    <GetAddress />
    <GetRonBalance />
    <TransferRon />
    <PersonalSign />
    <SignTypedDataV4 />
    <ApproveAxs />
    <TransferAxs />
    <SwapAxsOnKatana />
    <StakingAxs />
    <AtiaActivation />
  </>
)
