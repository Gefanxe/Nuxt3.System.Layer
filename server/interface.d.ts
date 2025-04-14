export interface CheckPermission {
  able: boolean
  p: P
}
interface P {
  sub: string
  obj: string
  act: string
}
