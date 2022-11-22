import { useWeb3React } from '@web3-react/core'
import uniswapNftAirdropClaim from 'abis/uniswap-nft-airdrop-claim.json'
import airdropBackgroundv2 from 'assets/images/airdopBackground.png'
import { ButtonEmphasis, ButtonSize, ThemeButton } from 'components/Button'
import { OpacityHoverState } from 'components/Common'
import Loader from 'components/Loader'
import { useContract } from 'hooks/useContract'
import { ChevronRightIcon } from 'nft/components/icons'
import { CollectionRewardsFetcher, RewardType } from 'nft/queries/genie/GetAirdorpMerkle'
import { useEffect, useState } from 'react'
import { useModalIsOpen, useToggleModal } from 'state/application/hooks'
import { ApplicationModal } from 'state/application/reducer'
import styled from 'styled-components/macro'
import { CloseIcon, ThemedText } from 'theme'

import Modal from '../Modal'

const ModalWrap = styled.div`
  display: flex;
  flex-direction: column;
`

const Body = styled.div`
  padding: 28px 20px 20px 20px;
`

const ClaimButton = styled(ThemeButton)`
  width: 100%;
  background-color: ${({ theme }) => theme.accentAction};
  margin-top: 40px;
  border-radius: 12px;
  color: ${({ theme }) => theme.white};
`

const Line = styled.div`
  height: 1px;
  width: 100%;
  background-color: ${({ theme }) => theme.white};
  opacity: 0.24;
  margin-top: 12px;
  margin-bottom: 12px;
`

const LinkWrap = styled.a`
  text-decoration: none;
  ${OpacityHoverState}
`

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
`

const StyledImage = styled.img`
  width: 100%;
  height: 170px;
`

const USDCLabel = styled.div`
  font-weight: 700;
  font-size: 36px;
  line-height: 44px;
  margin-top: 8px;
  color: white;
`

const TextContainer = styled.div`
  position: absolute;
  left: 16px;
  top: 16px;
  right: 16px;
`

const RewardsDetailsContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`

const CurrencyText = styled.span`
  color: white;
  font-weight: 500;
  font-size: 12px;
  line-height: 14.5px;
`

const ClaimContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  height: 380px;
  padding: 60px 28px;
  padding-bottom: 20px;
`

const SuccessText = styled.div`
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  margin-top: 24px;
  margin-bottom: 8px;
`

const EtherscanLink = styled.a`
  text-decoration: none;

  ${OpacityHoverState}
`

const CloseButton = styled(ThemeButton)`
  max-width: 68px;
  margin-top: auto;
  margin-left: auto;
  margin-right: auto;
`

const SyledCloseIcon = styled(CloseIcon)`
  float: right;
  height: 24px;

  ${OpacityHoverState}
`

const RewardsText = styled.span`
  font-size: 12px;
  line-height: 16px;
  color: ${({ theme }) => theme.white};

  &:first-child {
    margin-bottom: 8px;
  }
`

const RewardsInformationText = styled.span`
  display: inline-block;
  font-size: 14px;
  line-height: 20px;
  color: ${({ theme }) => theme.textPrimary};
  margin-bottom: 28px;
`

const MainHeader = styled.span`
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  color: ${({ theme }) => theme.white};
`

const AirdropModal = () => {
  const [isClaimed, setClaimed] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [totalAmount] = useState(300)
  const isOpen = useModalIsOpen(ApplicationModal.UNISWAP_NFT_AIRDROP_CLAIM)
  const usdcAirdropToggle = useToggleModal(ApplicationModal.UNISWAP_NFT_AIRDROP_CLAIM)
  const contract = useContract('0x8B799381ac40b838BBA4131ffB26197C432AFe78', uniswapNftAirdropClaim)
  const { provider } = useWeb3React()
  // provider
  //   ? getContract('0xb5Cf43a08dDF40F9d4EB1d86347778E70C211157', uniswapNftAirdropClaim, provider)
  //   : undefined

  useEffect(() => {
    async function getInfo() {
      if (contract && provider) {
        // const result = await contract.isClaimed('0xb5Cf43a08dDF40F9d4EB1d86347778E70C211157')
        try {
          const result = await contract.connect(provider).functions.isClaimed(4754)
          // console.log(Object.keys(contract.connect(provider).functions))
          console.log(result)
        } catch (err) {
          console.log('errored out')
        }
      } else {
        console.log('no contract')
      }
    }

    getInfo()
  }, [contract])

  // CollectionRewardsFetcher('0x54be3a794282c030b15e43ae2bb182e14c409c5e').then((res) => {
  //   const { data } = res

  //   for (const claim of data) {
  //     if (claim.rewardType === RewardType.LOOKS_RARE_NFT_COMMERCE_REWARDS) {
  //     }
  //   }
  // })

  const dismiss = () => {
    usdcAirdropToggle()

    setTimeout(() => {
      setClaimed(false)
    }, 500)
  }

  const submit = () => {
    setIsSubmitting(true)

    setTimeout(() => {
      setIsSubmitting(false)
      setClaimed(true)
    }, 1000)
  }

  return (
    <Modal hideBorder isOpen={isOpen} onDismiss={dismiss} maxHeight={90} maxWidth={400}>
      <ModalWrap>
        {isClaimed ? (
          <ClaimContainer>
            <ThemedText.HeadlineSmall>Congratulations!</ThemedText.HeadlineSmall>
            <SuccessText>
              You have successfully claimed {totalAmount} USDC. Thank you for supporting Genie.xyz.
            </SuccessText>
            <EtherscanLink href="https://etherscan.io/" target="_blank">
              <ThemedText.Link>
                <div style={{ display: 'flex', alignItems: 'center', textAlign: 'center', justifyContent: 'center' }}>
                  <span style={{ marginRight: 8 }}>Etherscan</span>
                  <ChevronRightIcon />
                </div>
              </ThemedText.Link>
            </EtherscanLink>

            <CloseButton size={ButtonSize.medium} emphasis={ButtonEmphasis.medium} onClick={dismiss}>
              Close
            </CloseButton>
          </ClaimContainer>
        ) : (
          <>
            <ImageContainer>
              <TextContainer>
                <SyledCloseIcon onClick={dismiss} stroke="white" />
                <MainHeader>Uniswap NFT Airdrop</MainHeader>
                <USDCLabel>{totalAmount} USDC</USDCLabel>
                <Line />
                <RewardsDetailsContainer>
                  <RewardsText>Trading rewards</RewardsText> <CurrencyText>300 USDC</CurrencyText>
                </RewardsDetailsContainer>
                <RewardsDetailsContainer>
                  <RewardsText>Genie NFT holder rewards</RewardsText> <CurrencyText>0</CurrencyText>
                </RewardsDetailsContainer>
              </TextContainer>
              <StyledImage src={airdropBackgroundv2} />
            </ImageContainer>
            <Body>
              <RewardsInformationText>
                As a long time supporter of Genie, you’ve been awarded {totalAmount} USDC tokens. Read more about
                Uniswap NFT.
              </RewardsInformationText>
              <LinkWrap href="https://uniswap.org/blog/uniswap-nft-aggregator-announcement" target="_blank">
                <ThemedText.Link>Read more about Uniswap NFT.</ThemedText.Link>
              </LinkWrap>

              <ClaimButton
                onClick={submit}
                size={ButtonSize.medium}
                emphasis={ButtonEmphasis.medium}
                disabled={isSubmitting}
              >
                {isSubmitting && <Loader stroke="white" />}
                <span>Claim{isSubmitting && 'ing'} USDC</span>
              </ClaimButton>
            </Body>
          </>
        )}
      </ModalWrap>
    </Modal>
  )
}

export default AirdropModal