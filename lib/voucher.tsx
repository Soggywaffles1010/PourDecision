// lib/voucher.tsx
export const validVouchers = ['SAVE10', 'COFFEELOVER', 'FREESHIP2025', 'BREW10'];

export function isVoucherValid(code: string): boolean {
  return validVouchers.includes(code.toUpperCase());
}
