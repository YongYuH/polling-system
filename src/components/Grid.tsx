import styled from '@emotion/styled'
import { flexbox, FlexboxProps, grid, GridProps as StyledSystemGridProps } from 'styled-system'

type GridProps = StyledSystemGridProps & FlexboxProps

const Grid = styled.div<GridProps>`
  display: grid;
  ${flexbox}
  ${grid}
`

export default Grid
