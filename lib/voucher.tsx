
export const validVouchers = ['YANAH11', 'MAROON5','CJC2004', 'JHOY10', 'VANZ10', 'CHOY10', 'ALIZ10', 'MEMAY10', 'SHIE10', 'ABBY10' , 'RJUN10'   ];

export function isVoucherValid(code: string): boolean {
  return validVouchers.includes(code.toUpperCase());
}
