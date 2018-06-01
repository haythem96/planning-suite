import React from 'react'
import styled from 'styled-components'
import { Text, EmptyStateCard, theme, font, IconCheck } from '@aragon/ui'
import emptyIcon from '../assets/empty-card-icon.svg'
import { noop } from '../utils/utils'

class ToolCard extends React.Component {
  static defaultProps = {
    template: null,
    active: false,
    onSelect: noop,
    label: '',
    description: ''
  }
  handleClick = () => {
    this.props.onSelect(this.props.repoId)
  }
  render() {
    const { active, icon, label, description, balance, budget, address } = this.props
    //const items = ['...', 'Remove Repo']
    return (
      <Main onClick={this.handleClick} active={active}>
        <Content>
          <CheckContainer active={active}>
            <IconCheck />
          </CheckContainer>
          <img src={icon} alt="" />
          <Text size="large" color={theme.textPrimary}>{label}</Text>
          <Text size="xxsmall" color={theme.textTertiary}>{description}</Text>
          <Stats>
            <StatsItem>
              <Text size="xxsmall" color={theme.textTertiary}>Balance</Text>
            </StatsItem>
            <StatsItem>
              <Text size="xxsmall" color={theme.textTertiary}>Budget</Text>
            </StatsItem>
          </Stats>
        </Content>
      </Main>
    )
  }
}

const Stats = styled.div`
  width: 100%;
  height: 30px;
  margin-top: auto;
  display: flex;
`

const StatsItem = styled.div`
  align-items: center;
  justify-content: center;
  width: 50%;
`

const Main = styled.button`
  position: relative;
  width: 220px;
  height: 190px;
  padding: 0;
  border: 0;
  background: none;
  cursor: pointer;
  border-radius: 3px;
  border-width: 1px;
  border-style: solid;
  border-color: ${({ active }) =>
    active ? theme.positive : theme.contentBorder};
  transition-duration: 150ms;
  transition-timing-function: ease-in-out;
  transition-property: border-color, transform, box-shadow;

  @media (min-width: 1180px) {
    width: 250px;
    height: 220px;
  }

  &:focus {
    outline: 0;
  }
  &:focus,
  &:hover {
    ${({ active }) =>
      active
        ? ''
        : `
            transform: $translateY(-1px);
            box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.15);
          `};
  }
  &:active {
    transform: translateY(0);
    box-shadow: none;
    border-color: ${theme.contentBorderActive};
  }
`

const Content = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100%;
  padding-top: 20px;
  ${font({ size: 'small' })};

  @media (min-width: 1180px) {
    padding-top: 45px;
    ${font({ size: 'large' })};
  }
  img {
    margin-bottom: 15px;
  }
`

const CheckContainer = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  transform: scale(${({ active }) => (active ? '1, 1' : '0, 0')});
  transition: transform 150ms ease-in-out;
`

const EmptyIcon = () => <img src={emptyIcon} alt="" />

const EmptyMain = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
`

class Tools extends React.Component {
  handleRepoSelect = repoId => {
    this.props.handleRepoSelect(repoId)
  }

  render () {
    const { onActivate } = this.props
    const tools = []

    if (Object.keys(tools).length === 0) {
      return (
        <EmptyMain>
          <EmptyStateCard
            icon={EmptyIcon}
            title="You have not created any planning tools"
            text="Get started now by creating a new tool"
            actionText="New Tool"
            onActivate={onActivate}
          />
        </EmptyMain>
      )
    }

    return (
      <ToolsMain>
        {Object.entries(tools).map(
          ([repoId, { name, description, collaborators, commits }]) => (
            <ToolCardWrapper key={repoId}>
              <ToolCard
                 repoId={repoId}
                 icon={emptyIcon}
                 label={name}
                 description={description}
                 balance={'33'}
                 budget={'5/m'}
               />
            </ToolCardWrapper>
         ))}
      </ToolsMain>
    )
  }
}

const ToolCardWrapper = styled.div`
  & + & {
    margin-left: 25px;
  }
`
const ToolsMain = styled.div`
  display: flex;
  margin-top: 50px;
`

export default Tools

