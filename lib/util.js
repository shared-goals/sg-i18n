export function regExpEscape(s){
  return String(s).replace(/[\\^$*+?.()|[\]{}]/g, '\\$&');
};
