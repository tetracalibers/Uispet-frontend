import { RangeInput } from '../../control/RangeInput'

export const BoxShadow = () => {
  return (
    <>
      <RangeInput min={-100} max={100} label='offset-X' value={0} />
      <RangeInput min={100} max={100} label='offset-Y' value={0} />
      <RangeInput min={100} max={100} label='blur' value={0} />
      <RangeInput min={100} max={100} label='spread' value={0} />
    </>
  )
}
