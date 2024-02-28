import * as enum_ from './enum'

export async function ResponseService (
  status: any,
  errorCode: any,
  message: any,
  data: any
): Promise<any> {
  return { status, response: { errorCode, message, data } }
}

export function LogSuccess (msg: any): void {
  console.log(enum_.GREEN_LOG, msg)
}

export function LogInfo (msg: any): void {
  console.log(enum_.CYAN_LOG, msg)
}

export function LogWarning (msg: any): void {
  console.log(enum_.YELLOW_LOG, msg)
}

export function LogDanger (msg: any): void {
  console.log(enum_.RED_LOG, msg)
}
