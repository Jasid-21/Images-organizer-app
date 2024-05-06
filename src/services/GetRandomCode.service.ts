export default function GetRandomCode(num = 4): string {
  const lower = 'abcdefghijklmnopqrstuvwxyz';
  const upper = lower.toUpperCase();
  const numbers = '0123456789';
  const total = lower + upper + numbers;
  
  let code = '';
  const lim = total.length;
  for(var i = 0; i < num ; i++) {
    const index = Math.floor(Math.random() * (lim - 1));
    const c = total[index];
    code += c;
  }

  return code;
}
